const db = require("../../db");

exports.findByUsername = async (username) => {
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  return rows[0];
};
