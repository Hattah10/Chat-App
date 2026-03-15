import { io, Socket } from "socket.io-client"

// Use environment variable for URL, good for dev/prod
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000"

// Create single socket instance
export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,  // optional: only connect when needed
})