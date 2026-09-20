import { pool } from "../config/db.js";

export const getCharacters = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, avatar FROM characters");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching characters:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatList = async (req, res) => {
  const { characterId } = req.params;

  try {
    // const result = await pool.query(
    //   `SELECT r.id, r.name, MAX(m.created_at) AS latest_message
    //    FROM room_participants rp
    //    JOIN rooms r ON rp.room_id = r.id
    //    LEFT JOIN messages m ON m.room_id = r.id
    //    WHERE rp.character_id = $1
    //    GROUP BY r.id, r.name
    //    ORDER BY latest_message DESC NULLS LAST`,
    //   [characterId],
    // );

    const result = await pool.query(
      `SELECT 
    r.id AS room_id,
    r.type,
    r.name,
    (ARRAY_AGG(c.id))[1] AS other_character_id,
    STRING_AGG(c.name, ', ') AS other_character_name,
    (ARRAY_AGG(c.avatar))[1] AS avatar
FROM room_participants rp
JOIN rooms r ON rp.room_id = r.id
LEFT JOIN room_participants rp2 
    ON rp2.room_id = r.id AND rp2.character_id != $1
LEFT JOIN characters c 
    ON c.id = rp2.character_id
WHERE rp.character_id = $1
GROUP BY r.id, r.type, r.name`,
      [characterId],
    );
    res.json(result.rows);
    console.log("get room list", result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};
