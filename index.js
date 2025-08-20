// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { exec } from "child_process";
import fs from "fs";
import cors from "cors";

// ================== SETUP ==================
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend
    methods: ["GET", "POST"]
  }
});

// ================== SOCKET.IO ==================
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Broadcast code changes
  socket.on("code-change", (newCode) => {
    socket.broadcast.emit("code-change", newCode);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ================== FILE-BASED USER AUTH ==================
const USERS_FILE = "users.json";

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "⚠️ Email & password required" });
  }

  let users = loadUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ success: false, message: "❌ Email already exists" });
  }

  users.push({ email, password });
  saveUsers(users);

  const token = "fake-token-" + Date.now();
  res.json({ success: true, message: "✅ Signup successful", token, email });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = "fake-token-" + Date.now();
    res.json({ success: true, message: "✅ Login successful", token, email });
  } else {
    res.status(401).json({ success: false, message: "❌ Invalid email or password" });
  }
});

// ================== RUN C++ CODE ==================
app.post("/run", (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ output: "⚠️ No code provided" });
  }

  fs.writeFileSync("main.cpp", code);

  const runCommand =
    process.platform === "win32"
      ? "g++ main.cpp -o main.exe && main.exe"
      : "g++ main.cpp -o main && ./main";

  exec(runCommand, (error, stdout, stderr) => {
    if (error) {
      return res.json({ output: stderr || error.message });
    }
    res.json({ output: stdout });
  });
});

// ================== START SERVER ==================
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.IO + API on http://localhost:${PORT}`);
});
