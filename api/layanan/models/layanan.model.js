const db = require("../../db");

const Works = {
  getAll: (callback) => {
    db.query("SELECT * FROM layanan", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM layanan WHERE id = ?", [id], callback);
  },

  create: (data, callback) => {
    db.query(
      "INSERT INTO layanan (kategori, foto, link_video, judul, deskripsi) VALUES (?, ?, ?, ?, ?)",
      [data.kategori, data.foto, data.link_video || "", data.judul, data.deskripsi],
      callback
    );
  },

  // ✅ update aman: hanya set foto jika memang ada (tidak kosong)
  update: (id, data, callback) => {
    const fields = [];
    const values = [];

    if (data.kategori !== undefined) {
      fields.push("kategori = ?");
      values.push(data.kategori);
    }

    // penting: jangan overwrite foto jadi "" / null
    if (data.foto !== undefined && String(data.foto).trim() !== "") {
      fields.push("foto = ?");
      values.push(String(data.foto).trim());
    }

    if (data.link_video !== undefined) {
      fields.push("link_video = ?");
      values.push(data.link_video || "");
    }

    if (data.judul !== undefined) {
      fields.push("judul = ?");
      values.push(data.judul);
    }

    if (data.deskripsi !== undefined) {
      fields.push("deskripsi = ?");
      values.push(data.deskripsi);
    }

    // kalau tidak ada field yang diupdate
    if (fields.length === 0) {
      return callback(null, { affectedRows: 0 });
    }

    values.push(id);
    const sql = `UPDATE layanan SET ${fields.join(", ")} WHERE id = ?`;
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM layanan WHERE id = ?", [id], callback);
  },
};

module.exports = Works;