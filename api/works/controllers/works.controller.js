const Works = require("../models/works.model");

function getUserId(req) {
  const id = req?.user?.id ? Number(req.user.id) : null;
  return Number.isFinite(id) && id > 0 ? id : null;
}

function toId(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function fixKategori(row) {
  const kategoriNama =
    row?.kategori_nama && String(row.kategori_nama).trim() !== ""
      ? String(row.kategori_nama).trim()
      : "Photography";

  return {
    ...row,
    kategori_nama: kategoriNama,
    kategori: kategoriNama,
  };
}

// GET all (public)
exports.getAllWorks = async (req, res) => {
  try {
    const results = await Works.getAllPublic();
    res.json((Array.isArray(results) ? results : []).map(fixKategori));
  } catch (err) {
    console.error("GET ALL WORKS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET by ID (public)
exports.getWorkById = async (req, res) => {
  try {
    const id = toId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const row = await Works.getByIdPublic(id);
    if (!row) return res.status(404).json({ message: "Work not found" });

    res.json(fixKategori(row));
  } catch (err) {
    console.error("GET WORK BY ID ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all (admin)
exports.getAllWorksAdmin = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const results = await Works.getAllByUserId(userId);
    res.json((Array.isArray(results) ? results : []).map(fixKategori));
  } catch (err) {
    console.error("GET ALL WORKS ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET by ID (admin)
exports.getWorkByIdAdmin = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = toId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const row = await Works.getByIdAndUserId(id, userId);
    if (!row) return res.status(404).json({ message: "Work not found" });

    res.json(fixKategori(row));
  } catch (err) {
    console.error("GET WORK BY ID ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST (admin)
exports.createWork = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const body = req.body || {};

    const foto = req.files?.foto?.[0]?.filename || null;
    const audio = req.files?.audio?.[0]?.filename || null;

    const judul = (body.judul || "").toString().trim();
    const deskripsi = (body.deskripsi || "").toString().trim();
    const link_video = (body.link_video || "").toString().trim();

    const layanan1_id = Number(body.layanan1_id);
    if (!Number.isFinite(layanan1_id) || layanan1_id <= 0) {
      return res.status(400).json({ message: "Kategori (layanan1) wajib dipilih" });
    }

    if (!judul) return res.status(400).json({ message: "Judul wajib diisi" });

    const payload = {
      user_id: userId,
      layanan1_id,
      judul,
      deskripsi: deskripsi || null,
      link_video: link_video || null,
      foto,
      audio,
    };

    const result = await Works.create(payload);

    res.status(201).json({
      message: "Work created",
      id: result.insertId,
      ...payload,
    });
  } catch (err) {
    console.error("CREATE WORK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT (admin)
exports.updateWork = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const existing = await Works.getByIdAndUserId(id, userId);
    if (!existing) return res.status(404).json({ message: "Work not found" });

    const body = req.body || {};
    const old = existing;

    const foto = req.files?.foto?.[0]?.filename || old.foto || null;
    const audio = req.files?.audio?.[0]?.filename || old.audio || null;

    const judul = (body.judul ?? old.judul ?? "").toString().trim();
    const deskripsi = (body.deskripsi ?? old.deskripsi ?? "").toString().trim();
    const link_video = (body.link_video ?? old.link_video ?? "").toString().trim();

    const layanan1_id_raw = body.layanan1_id ?? old.layanan1_id;
    const layanan1_id = Number(layanan1_id_raw);

    if (!Number.isFinite(layanan1_id) || layanan1_id <= 0) {
      return res.status(400).json({ message: "Kategori (layanan1) wajib dipilih" });
    }

    if (!judul) return res.status(400).json({ message: "Judul wajib diisi" });

    const payload = {
      layanan1_id,
      judul,
      deskripsi: deskripsi || null,
      link_video: link_video || null,
      foto,
      audio,
    };

    const result = await Works.updateByIdAndUserId(id, userId, payload);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json({ message: "Work updated", id, ...payload });
  } catch (err) {
    console.error("UPDATE WORK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE (admin)
exports.deleteWork = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = toId(req.params.id);
    if (!id) return res.status(400).json({ message: "ID tidak valid" });

    const result = await Works.deleteByIdAndUserId(id, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json({ message: "Work deleted", id });
  } catch (err) {
    console.error("DELETE WORK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
