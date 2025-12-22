const db = require("../../db");

const Works = {
  getAll: async () => {
    const [rows] = await db.execute("SELECT * FROM works");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM works WHERE id = ?", [id]);
    return rows;
  },

  create: async (data) => {
    const [result] = await db.execute(
      "INSERT INTO works (kategori, foto, link_video, audio, judul, deskripsi) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.kategori,
        data.foto || "",
        data.link_video || "",
        data.audio || "",
        data.judul || "",
        data.deskripsi || "",
      ]
    );
    return result;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    if (data.kategori !== undefined) {
      fields.push("kategori = ?");
      values.push(data.kategori);
    }

    if (data.foto !== undefined && String(data.foto).trim() !== "") {
      fields.push("foto = ?");
      values.push(String(data.foto).trim());
    }

    if (data.link_video !== undefined) {
      fields.push("link_video = ?");
      values.push(data.link_video || "");
    }

    if (data.audio !== undefined && String(data.audio).trim() !== "") {
      fields.push("audio = ?");
      values.push(String(data.audio).trim());
    }

    if (data.judul !== undefined) {
      fields.push("judul = ?");
      values.push(data.judul);
    }

    if (data.deskripsi !== undefined) {
      fields.push("deskripsi = ?");
      values.push(data.deskripsi);
    }

    if (fields.length === 0) return { affectedRows: 0 };

    values.push(id);
    const sql = `UPDATE works SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.execute(sql, values);
    return result;
  },

  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM works WHERE id = ?", [id]);
    return result;
  },
};

module.exports = Works;
