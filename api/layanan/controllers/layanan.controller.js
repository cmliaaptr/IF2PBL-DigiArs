const Layanan = require("../models/layanan.model");

// GET all
exports.getAllLayanan = async (req, res) => {
  try {
    const results = await Layanan.getAll();

    const fixed = results.map((l) => ({
      ...l,
      kategori: l.kategori && String(l.kategori).trim() !== "" ? l.kategori : "Photography",
    }));

    res.json(fixed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET by ID
exports.getLayananById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await Layanan.getById(id);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
exports.createLayanan = async (req, res) => {
  try {
    const data = req.body;

    // FOTO (single file)
    data.foto = req.file ? req.file.filename : "";

    // kategori: form > auto
    let kategori = (data.kategori || "").toString().trim();
    if (!kategori) {
      if (data.link_video && String(data.link_video).trim() !== "") kategori = "Videography";
      else kategori = "Photography";
    }
    data.kategori = kategori;

    const result = await Layanan.create(data);

    res.status(201).json({
      message: "Layanan created",
      id: result.insertId,
      ...data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.updateLayanan = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const existing = await Layanan.getById(id);
    if (!existing || existing.length === 0) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    const old = existing[0];

    // FOTO: file baru > lama
    data.foto = req.file ? req.file.filename : old.foto || "";

    // kategori: form > lama > auto
    let kategori =
      (data.kategori || "").toString().trim() ||
      (old.kategori || "").toString().trim();

    if (!kategori) {
      if (data.link_video && String(data.link_video).trim() !== "") {
        kategori = "Videography";
      } else if (
        (data.judul || old.judul || "").toLowerCase().includes("animasi") ||
        (data.deskripsi || old.deskripsi || "").toLowerCase().includes("animasi")
      ) {
        kategori = "Animasi";
      } else {
        kategori = "Photography";
      }
    }

    data.kategori = kategori;

    const result = await Layanan.update(id, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    res.json({ message: "Layanan updated", id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.deleteLayanan = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Layanan.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Layanan not found" });
    }

    res.json({ message: "Layanan deleted", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
