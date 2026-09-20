# Chat-App

## Run locally

This app has two parts: a Vite React frontend and an Express + Socket.IO server that talks to PostgreSQL. You need **Node.js**, **npm**, and a running **PostgreSQL** instance.

### 1. Clone the repo

```bash
git clone https://github.com/Hattah10/Chat-App.git
cd chat-app
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `server/.env` file with your database settings:

```env
DB_HOST=localhost
DB_USER=postgres
DB_NAME=chat_app
DB_PASSWORD=your_password
DB_PORT=5432
DB_MAX_CONNECTIONS=10
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000
DB_MAX_LIFETIME=1800
```

The server expects tables such as `characters`, `rooms`, `room_participants`, and `messages` in that database.

Start the API (listens on port **3010**):

```bash
npm run dev
```

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create a `frontend/.env` file so the client points at the local server:

```env
VITE_API_URL=http://localhost:3010/api/
VITE_SOCKET_URL=http://localhost:3010
```

Start the Vite dev server (usually **http://localhost:5173**):

```bash
npm run dev
```

### 4. Open the app

Visit [http://localhost:5173](http://localhost:5173). Keep both the server and frontend terminals running.
