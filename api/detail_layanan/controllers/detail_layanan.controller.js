const Detail = require("../models/detail_layanan.model");

function toId(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function getUserId(req) {
  const n = Number(req.user?.id);
  return Number.isFinite(n) && n > 0 ? n : null;
}

const ALLOWED_PILIHAN = new Set(["Card 1", "Card 2", "Card 3", "Card 4"]);

// HERO 
exports.getHeroByLayanan = async (req, res) => {
  try {
    const layanan1_id = toId(req.params.layananId);
    if (!layanan1_id) {
      return res.status(400).json({ message: "layananId tidak valid" });
    }

    const hero = await Detail.getHeroByLayanan(layanan1_id);
    return res.json(hero || null);
  } catch (e) {
    console.error("getHeroByLayanan error:", e);
    return res.status(500).json({ message: "Gagal ambil hero" });
  }
};

exports.upsertHeroByLayanan = async (req, res) => {
  try {
    const layanan1_id = toId(req.params.layananId);
    if (!layanan1_id) {
      return res.status(400).json({ message: "layananId tidak valid" });
    }

    const user_id = getUserId(req);
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const judul = String(req.body?.judul || "").trim();
    const deskripsi = String(req.body?.deskripsi || "").trim();
    const foto = req.file?.filename ? String(req.file.filename) : "";

    if (!judul) {
      return res.status(400).json({ message: "Judul hero wajib diisi" });
    }

    await Detail.upsertHeroByLayanan({
      layanan1_id,
      user_id,
      judul,
      deskripsi: deskripsi || "",
      foto, 
    });

    return res.json({ message: "Hero berhasil disimpan" });
  } catch (e) {
    console.error("upsertHeroByLayanan error:", e);
    return res.status(500).json({ message: e?.message || "Gagal simpan hero" });
  }
};

// BENEFIT 
exports.getBenefitsByLayanan = async (req, res) => {
  try {
    const layanan1_id = toId(req.params.layananId);
    if (!layanan1_id) {
      return res.status(400).json({ message: "layananId tidak valid" });
    }

    const rows = await Detail.getBenefitsByLayanan(layanan1_id);
    return res.json(Array.isArray(rows) ? rows : []);
  } catch (e) {
    console.error("getBenefitsByLayanan error:", e);
    return res.status(500).json({ message: "Gagal ambil benefit" });
  }
};

exports.upsertBenefitByLayanan = async (req, res) => {
  try {
    const layanan1_id = toId(req.params.layananId);
    if (!layanan1_id) {
      return res.status(400).json({ message: "layananId tidak valid" });
    }

    const user_id = getUserId(req);
    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const pilihan = String(req.body?.pilihan || "").trim();
    const judul = String(req.body?.judul || "").trim();
    const deskripsi = String(req.body?.deskripsi || "").trim();
    const icon = req.file?.filename ? String(req.file.filename) : "";

    if (!pilihan) {
      return res.status(400).json({ message: "Pilihan card wajib diisi" });
    }
    if (!ALLOWED_PILIHAN.has(pilihan)) {
      return res.status(400).json({ message: "Pilihan card tidak valid" });
    }
    if (!judul) {
      return res.status(400).json({ message: "Judul benefit wajib diisi" });
    }
    if (!deskripsi) {
      return res.status(400).json({ message: "Deskripsi benefit wajib diisi" });
    }

    await Detail.upsertBenefitByLayanan({
      layanan1_id,
      user_id,
      pilihan,
      judul,
      deskripsi,
      icon, 
    });

    return res.json({ message: "Benefit berhasil disimpan" });
  } catch (e) {
    console.error("upsertBenefitByLayanan error:", e);
    return res.status(500).json({ message: e?.message || "Gagal simpan benefit" });
  }
};
