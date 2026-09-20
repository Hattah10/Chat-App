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
          `SELECT
            m.id,
            m.room_id,
            m.character_id,
            m.content,
            m.created_at,
            c.name,
            c.avatar
          FROM messages m
          LEFT JOIN characters c ON c.id = m.character_id
          WHERE m.room_id = $1
          ORDER BY m.created_at ASC`,
          [room_id],
        );
        console.log("load_messages", result.rows);
        socket.emit("load_messages", result.rows);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    });

    socket.on("send_message", async (data) => {
      const { room_id, character_id, content, id } = data;

      try {
        const characterResult = await pool.query(
          "SELECT name, avatar FROM characters WHERE id = $1",
          [character_id],
        );
        const character = characterResult.rows[0];

        io.to(room_id).emit("receive_message", {
          ...data,
          name: character?.name ?? null,
          avatar: character?.avatar ?? null,
        });

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
