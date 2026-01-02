const db = require("../../db");

const Layanan = {
  getAllByUserId: async (userId) => {
    const [rows] = await db.execute(
      `
      SELECT 
        l.*,
        COALESCE(l1.judul, '') AS kategori_nama
      FROM layanan l
      LEFT JOIN layanan1 l1 ON l1.id = l.layanan1_id
      WHERE l.user_id = ?
      ORDER BY l.created_at DESC, l.id DESC
      `,
      [userId]
    );
    return rows;
  },

  getByIdAndUserId: async (id, userId) => {
    const [rows] = await db.execute(
      `
      SELECT 
        l.*,
        COALESCE(l1.judul, '') AS kategori_nama
      FROM layanan l
      LEFT JOIN layanan1 l1 ON l1.id = l.layanan1_id
      WHERE l.id = ? AND l.user_id = ?
      LIMIT 1
      `,
      [id, userId]
    );
    return rows[0] || null;
  },

  getAllPublic: async () => {
    const [rows] = await db.execute(
      `
      SELECT 
        l.*,
        COALESCE(l1.judul, '') AS kategori_nama
      FROM layanan l
      LEFT JOIN layanan1 l1 ON l1.id = l.layanan1_id
      ORDER BY l.created_at DESC, l.id DESC
      `
    );
    return rows;
  },

  create: async (data) => {
    const user_id = Number(data.user_id);
    const layanan1_id = Number(data.layanan1_id);

    const foto = (data.foto || "").toString().trim();
    const link_video = (data.link_video || "").toString().trim();
    const judul = (data.judul || "").toString().trim();
    const deskripsi = (data.deskripsi || "").toString().trim();

    const safeLinkVideo = link_video;

    const [result] = await db.execute(
      `
      INSERT INTO layanan (user_id, layanan1_id, foto, link_video, judul, deskripsi)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        layanan1_id,
        foto ? foto : null,
        safeLinkVideo,
        judul,
        deskripsi ? deskripsi : null,
      ]
    );

    return result;
  },

  updateByIdAndUserId: async (id, userId, data) => {
    const fields = [];
    const values = [];

    if (data.layanan1_id !== undefined) {
      fields.push("layanan1_id = ?");
      values.push(Number(data.layanan1_id) || 0);
    }

    if (data.foto !== undefined) {
      const v = (data.foto || "").toString().trim();
      fields.push("foto = ?");
      values.push(v ? v : null);
    }

    if (data.link_video !== undefined) {
      const v = (data.link_video || "").toString().trim();
      fields.push("link_video = ?");
      values.push(v); 
    }

    if (data.judul !== undefined) {
      fields.push("judul = ?");
      values.push((data.judul || "").toString().trim());
    }

    if (data.deskripsi !== undefined) {
      const v = (data.deskripsi || "").toString().trim();
      fields.push("deskripsi = ?");
      values.push(v ? v : null);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    values.push(Number(id), Number(userId));

    const sql = `
      UPDATE layanan
      SET ${fields.join(", ")}
      WHERE id = ? AND user_id = ?
    `;

    const [result] = await db.execute(sql, values);
    return result;
  },

  deleteByIdAndUserId: async (id, userId) => {
    const [result] = await db.execute(
      "DELETE FROM layanan WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return result;
  },
};

module.exports = Layanan;
