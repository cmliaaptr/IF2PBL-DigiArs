const Works = require("../models/works.model");

// GET all
exports.getAllWorks = async (req, res) => {
  try {
    const results = await Works.getAll();

    const fixed = results.map((w) => ({
      ...w,
      kategori: w.kategori && w.kategori.trim() !== "" ? w.kategori : "Photography",
    }));

    res.json(fixed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET by ID
exports.getWorkById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await Works.getById(id);

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST
exports.createWork = async (req, res) => {
  try {
    const data = req.body;

    data.foto = req.files?.foto ? req.files.foto[0].filename : "";
    data.audio = req.files?.audio ? req.files.audio[0].filename : "";

    let kategori = (data.kategori || "").toString().trim();
    if (!kategori) {
      if (data.audio) kategori = "Sound Production";
      else if (data.link_video && String(data.link_video).trim() !== "") kategori = "Videography";
      else kategori = "Photography";
    }
    data.kategori = kategori;

    const result = await Works.create(data);
    res.status(201).json({ message: "Work created", id: result.insertId, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT
exports.updateWork = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const existing = await Works.getById(id);
    if (!existing || existing.length === 0) {
      return res.status(404).json({ message: "Work not found" });
    }

    const old = existing[0];

    data.foto = req.files?.foto ? req.files.foto[0].filename : (old.foto || "");
    data.audio = req.files?.audio ? req.files.audio[0].filename : (old.audio || "");

    let kategori =
      (data.kategori || "").toString().trim() ||
      (old.kategori || "").toString().trim();

    if (!kategori) {
      if (data.audio) kategori = "Sound Production";
      else if (data.link_video && String(data.link_video).trim() !== "") kategori = "Videography";
      else kategori = "Photography";
    }
    data.kategori = kategori;

    const result = await Works.update(id, data);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Work not found" });

    res.json({ message: "Work updated", id, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.deleteWork = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Works.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.json({ message: "Work deleted", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
