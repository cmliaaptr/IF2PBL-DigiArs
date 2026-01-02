const Layanan = require("../models/layanan.model");

function getUserId(req) {
  const id = req?.user?.id ? Number(req.user.id) : null;
  return Number.isFinite(id) && id > 0 ? id : null;
}

function pickArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

exports.getAllPublic = async (req, res) => {
  try {
    const results = await Layanan.getAllPublic();
    res.json(results);
  } catch (err) {
    console.error("GET ALL PUBLIC LAYANAN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllLayanan = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const results = await Layanan.getAllByUserId(userId);
    res.json(pickArray(results));
  } catch (err) {
    console.error("GET ALL LAYANAN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getLayananById = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const row = await Layanan.getByIdAndUserId(id, userId);
    if (!row) return res.status(404).json({ message: "Layanan not found" });

    res.json(row);
  } catch (err) {
    console.error("GET LAYANAN BY ID ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createLayanan = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const body = req.body || {};

    const layanan1_id = Number(body.layanan1_id || 0);
    if (!layanan1_id || layanan1_id <= 0) {
      return res.status(400).json({ message: "Kategori wajib dipilih" });
    }

    const judul = String(body.judul || "").trim();
    const deskripsi = String(body.deskripsi || "").trim();
    const link_video = String(body.link_video || "").trim();

    const foto = req.file?.filename || null;

    if (!judul) return res.status(400).json({ message: "Judul wajib diisi" });

    if (!foto && !link_video) {
      return res
        .status(400)
        .json({ message: "Minimal upload foto atau isi link video" });
    }

    const payload = {
      user_id: userId, 
      layanan1_id,
      foto,
      link_video: link_video || null,
      judul,
      deskripsi: deskripsi || null,
    };

    const result = await Layanan.create(payload);

    res.status(201).json({
      message: "Layanan created",
      id: result.insertId,
      ...payload,
    });
  } catch (err) {
    console.error("CREATE LAYANAN ERROR:", err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateLayanan = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const existing = await Layanan.getByIdAndUserId(id, userId);
    if (!existing) return res.status(404).json({ message: "Layanan not found" });

    const body = req.body || {};

    const layanan1_id = Number(body.layanan1_id ?? existing.layanan1_id ?? 0);
    if (!layanan1_id || layanan1_id <= 0) {
      return res.status(400).json({ message: "Kategori wajib dipilih" });
    }

    const judul = String(body.judul ?? existing.judul ?? "").trim();
    const deskripsi = String(body.deskripsi ?? existing.deskripsi ?? "").trim();
    const link_video = String(body.link_video ?? existing.link_video ?? "").trim();

    const foto = req.file?.filename || existing.foto || null;

    if (!judul) return res.status(400).json({ message: "Judul wajib diisi" });

    if (!deskripsi) {
      return res.status(400).json({ message: "Deskripsi wajib diisi saat edit" });
    }

    const payload = {
      layanan1_id,
      foto,
      link_video: link_video || null,
      judul,
      deskripsi,
    };

    const result = await Layanan.updateByIdAndUserId(id, userId, payload);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    res.json({ message: "Layanan updated", id, ...payload });
  } catch (err) {
    console.error("UPDATE LAYANAN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (ADMIN) 
exports.deleteLayanan = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const result = await Layanan.deleteByIdAndUserId(id, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    res.json({ message: "Layanan deleted", id });
  } catch (err) {
    console.error("DELETE LAYANAN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
