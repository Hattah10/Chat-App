import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import registerChatSocket from "./sockets/chat.socket.js";
import { connectDB } from "./config/db.js";
import charactersRoutes from "./routes/charactersRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  registerChatSocket(io);
  connectDB();

  app.use("/api/characters", charactersRoutes);
  app.use("/api/rooms", roomRoutes);

  return server;
}
