import { pool } from "../config/db.js";

export const createRoom = async (req, res) => {
  const { character_id, participant_ids } = req.body;

  if (!character_id) {
    return res.status(400).json({ error: "character_id is required" });
  }

  if (!Array.isArray(participant_ids) || participant_ids.length === 0) {
    return res
      .status(400)
      .json({ error: "participant_ids must be a non-empty array" });
  }

  const uniqueParticipants = [
    ...new Set(participant_ids.filter((id) => id && id !== character_id)),
  ];

  if (uniqueParticipants.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one other participant is required" });
  }

  const type = uniqueParticipants.length === 1 ? "personal" : "group";
  const roomName = type === "group" ? (name ?? null) : null;
  const allParticipantIds = [character_id, ...uniqueParticipants];

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let roomName = null;
    if (type === "group") {
      const namePlaceholders = allParticipantIds
        .map((_, index) => `$${index + 1}`)
        .join(", ");
      const namesResult = await client.query(
        `SELECT id, name FROM characters WHERE id IN (${namePlaceholders})`,
        allParticipantIds,
      );
      const nameById = new Map(
        namesResult.rows.map((row) => [String(row.id), row.name]),
      );
      roomName = allParticipantIds
        .map((id) => nameById.get(String(id)))
        .filter(Boolean)
        .join(", ");
    }

    const roomResult = await client.query(
      `INSERT INTO rooms (type, name)
       VALUES ($1, $2)
       RETURNING id, type, name`,
      [type, roomName],
    );
    const room = roomResult.rows[0];

    const values = [];
    const placeholders = allParticipantIds.map((id, index) => {
      values.push(room.id, id);
      return `($${index * 2 + 1}, $${index * 2 + 2})`;
    });

    await client.query(
      `INSERT INTO room_participants (room_id, character_id)
       VALUES ${placeholders.join(", ")}`,
      values,
    );

    await client.query("COMMIT");

    res.status(201).json({
      room_id: room.id,
      type: room.type,
      name: room.name,
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error creating room:", err);
    res.status(500).json({ error: "Failed to create room" });
  } finally {
    client.release();
  }
};
