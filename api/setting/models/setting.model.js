const db = require("../../db");

exports.getByUserId = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM setting WHERE user_id = ? LIMIT 1",
    [user_id]
  );
  return rows[0] || null;
};

exports.upsertByUserId = async (user_id, { wa, link_ig }) => {
  const [result] = await db.execute(
    `INSERT INTO setting (user_id, wa, link_ig)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
       wa = VALUES(wa),
       link_ig = VALUES(link_ig)`,
    [user_id, wa, link_ig]
  );

  return result;
};

exports.getOne = async () => {
  const [rows] = await db.execute("SELECT wa, link_ig FROM setting LIMIT 1");
  return rows[0];
};
