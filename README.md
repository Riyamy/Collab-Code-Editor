# Real-Time Collaborative Code Editor

A full-stack web application enabling multiple users to edit code simultaneously in real-time. Built to simulate the core functionality of modern collaborative development environments.

## 🚀 Features

- **Live Multi-User Editing:** Synchronized code editing using WebSockets (Socket.IO) with operational transformation for conflict resolution.
- **Rich Editor Interface:** Powered by Monaco Editor (the core of VS Code) for a feature-rich editing experience with syntax highlighting.
- **Live Cursor Tracking:** See other participants' cursors and edits in real-time, enhancing collaboration.
- **Role-Based Access Control:** Secure user authentication (JWT) and authorization to manage edit/view permissions.
- **Instant Output Display:** Integrated console to display code output instantly.

## 🛠️ Tech Stack

- **Frontend:** React, Monaco Editor, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** (Mention if deployed, e.g., Vercel for frontend, Railway/Render for backend)

## 📦 Installation & Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/real-time-collab-editor.git
    cd real-time-collab-editor
    ```

2.  Install dependencies for both client and server:
    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3.  Start the development servers:
    ```bash
    # Start the backend server (from /server)
    npm run dev

    # Start the frontend client (from /client)
    npm start
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view the application.
