const db = require("../../db");

function getUserId(req) {
  const id = req?.user?.id;
  const n = Number(id);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function toInt(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function cleanStr(v) {
  return typeof v === "string" ? v.trim() : "";
}

exports.getAllPublic = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, judul, foto, deskripsi FROM layanan1 ORDER BY created_at DESC"
    );
    return res.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("GET ALL PUBLIC ERROR:", error);
    return res.status(500).json([]);
  }
};

exports.getByIdPublic = async (req, res) => {
  try {
    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ message: "id tidak valid" });

    const [rows] = await db.query(
      "SELECT id, judul, foto, deskripsi FROM layanan1 WHERE id = ? LIMIT 1",
      [id]
    );

    if (!rows?.length) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("GET BY ID PUBLIC ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const [rows] = await db.query(
      "SELECT * FROM layanan1 WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    return res.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error("GET ALL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ message: "id tidak valid" });

    const [rows] = await db.query(
      "SELECT * FROM layanan1 WHERE id = ? AND user_id = ? LIMIT 1",
      [id, userId]
    );

    if (!rows?.length) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("GET BY ID ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const judul = cleanStr(req.body?.judul);
    const deskripsiRaw = cleanStr(req.body?.deskripsi);
    const deskripsi = deskripsiRaw === "" ? null : deskripsiRaw;

    if (!judul) return res.status(400).json({ message: "Judul wajib diisi" });
    if (!req.file?.filename)
      return res.status(400).json({ message: "Foto wajib diisi" });

    const foto = req.file.filename;

    const [result] = await db.query(
      "INSERT INTO layanan1 (user_id, judul, foto, deskripsi) VALUES (?, ?, ?, ?)",
      [userId, judul, foto, deskripsi]
    );

    return res.status(201).json({
      message: "Layanan card berhasil ditambahkan",
      id: result.insertId,
      data: { id: result.insertId, user_id: userId, judul, foto, deskripsi },
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    if (error?.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        message: "User tidak valid (foreign key gagal). Pastikan login benar.",
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ message: "id tidak valid" });

    const judul = cleanStr(req.body?.judul);
    const deskripsiRaw = cleanStr(req.body?.deskripsi);
    const deskripsi = deskripsiRaw === "" ? null : deskripsiRaw;

    if (!judul) return res.status(400).json({ message: "Judul wajib diisi" });

    let sql = "UPDATE layanan1 SET judul = ?, deskripsi = ?";
    const params = [judul, deskripsi];

    if (req.file?.filename) {
      sql += ", foto = ?";
      params.push(req.file.filename);
    }

    sql += " WHERE id = ? AND user_id = ?";
    params.push(id, userId);

    const [result] = await db.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    return res.json({ message: "Layanan card berhasil diupdate" });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = toInt(req.params.id);
    if (!id) return res.status(400).json({ message: "id tidak valid" });

    const [result] = await db.query(
      "DELETE FROM layanan1 WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    return res.json({ message: "Layanan card berhasil dihapus" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
