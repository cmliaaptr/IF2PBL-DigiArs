const db = require("../../db");

const Works = {
  getAllPublic: async () => {
    const [rows] = await db.execute(
      `SELECT w.*,
              l1.judul AS kategori_nama
       FROM works w
       LEFT JOIN layanan1 l1 ON l1.id = w.layanan1_id
       ORDER BY w.created_at DESC, w.id DESC`
    );
    return rows;
  },

  getByIdPublic: async (id) => {
    const [rows] = await db.execute(
      `SELECT w.*,
              l1.judul AS kategori_nama
       FROM works w
       LEFT JOIN layanan1 l1 ON l1.id = w.layanan1_id
       WHERE w.id = ?
       LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  },

  getAllByUserId: async (userId) => {
    const [rows] = await db.execute(
      `SELECT w.*,
              l1.judul AS kategori_nama
       FROM works w
       LEFT JOIN layanan1 l1 ON l1.id = w.layanan1_id
       WHERE w.user_id = ?
       ORDER BY w.created_at DESC, w.id DESC`,
      [userId]
    );
    return rows;
  },

  getByIdAndUserId: async (id, userId) => {
    const [rows] = await db.execute(
      `SELECT w.*,
              l1.judul AS kategori_nama
       FROM works w
       LEFT JOIN layanan1 l1 ON l1.id = w.layanan1_id
       WHERE w.id = ? AND w.user_id = ?
       LIMIT 1`,
      [id, userId]
    );
    return rows[0] || null;
  },

  getByIdAndUserIdRaw: async (id, userId) => {
    const [rows] = await db.execute(
      `SELECT *
       FROM works
       WHERE id = ? AND user_id = ?
       LIMIT 1`,
      [id, userId]
    );
    return rows[0] || null;
  },

  isLayanan1OwnedByUser: async (layanan1_id, userId) => {
    const [rows] = await db.execute(
      `SELECT id
       FROM layanan1
       WHERE id = ? AND user_id = ?
       LIMIT 1`,
      [layanan1_id, userId]
    );
    return rows.length > 0;
  },

  // CREATE
  create: async (data) => {
  const user_id = Number(data.user_id);
  const layanan1_id = Number(data.layanan1_id);

  const foto = (data.foto || "").toString().trim();
  const link_video = (data.link_video || "").toString().trim();
  const audio = (data.audio || "").toString().trim();
  const judul = (data.judul || "").toString().trim();
  const deskripsi = (data.deskripsi || "").toString().trim();

  const [result] = await db.execute(
    `INSERT INTO works (user_id, layanan1_id, foto, link_video, audio, judul, deskripsi)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, layanan1_id, foto, link_video, audio, judul, deskripsi]
  );

  return result;
},

  // UPDATE (admin) by id + user_id
  updateByIdAndUserId: async (id, userId, data) => {
  const fields = [];
  const values = [];

  if (data.layanan1_id !== undefined) {
    fields.push("layanan1_id = ?");
    values.push(Number(data.layanan1_id));
  }

  if (data.foto !== undefined) {
    fields.push("foto = ?");
    values.push((data.foto || "").toString().trim());
  }

  if (data.link_video !== undefined) {
    fields.push("link_video = ?");
    values.push((data.link_video || "").toString().trim());
  }

  if (data.audio !== undefined) {
    fields.push("audio = ?");
    values.push((data.audio || "").toString().trim());
  }

  if (data.judul !== undefined) {
    fields.push("judul = ?");
    values.push((data.judul || "").toString().trim());
  }

  if (data.deskripsi !== undefined) {
    fields.push("deskripsi = ?");
    values.push((data.deskripsi || "").toString().trim());
  }

  if (fields.length === 0) return { affectedRows: 0 };

  values.push(id, userId);
  const sql = `UPDATE works SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`;

  const [result] = await db.execute(sql, values);
  return result;
},

  // DELETE
  deleteByIdAndUserId: async (id, userId) => {
    const [result] = await db.execute(
      "DELETE FROM works WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result;
  },
};

module.exports = Works;
