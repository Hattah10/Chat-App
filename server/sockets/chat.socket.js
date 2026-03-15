import { pool } from "../config/db.js";

export default function registerChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join_room", async (room_id) => {
      if (!room_id) {
        console.log("Invalid room_id:", room_id);
        return;
      }
      socket.join(room_id);

      try {
        const result = await pool.query(
          "SELECT * FROM messages WHERE room_id = $1 ORDER BY created_at ASC",
          [room_id],
        );
        console.log("load_messages", result.rows);
        // send messages back to client
        socket.emit("load_messages", result.rows);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    });

    socket.on("send_message", async (data) => {
      const { room_id, character_id, content, created_at, id } = data;

      io.to(room_id).emit("receive_message", data);

      // 2. Save message in background
      try {
        await pool.query(
          `INSERT INTO messages (id, room_id, character_id, content)
       VALUES ($1, $2, $3, $4)`,
          [id, room_id, character_id, content],
        );
        console.log("save message in db successfully");
      } catch (err) {
        console.error("Failed to save message", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
