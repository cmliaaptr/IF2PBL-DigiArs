const Works = require("../../works/models/works.model");

// GET all
exports.getAllWorks = (req, res) => {
  Works.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const fixed = results.map((w) => ({
      ...w,
      kategori: w.kategori && w.kategori.trim() !== ""
        ? w.kategori
        : "Photography",
    }));

    res.json(fixed);
  });
};


// GET by ID
exports.getWorkById = (req, res) => {
  const id = req.params.id;
  Works.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0)
      return res.status(404).json({ message: "Work not found" });
    res.json(results[0]);
  });
};

// POST
exports.createWork = (req, res) => {
  const data = req.body;

  // FILES
  data.foto = req.files?.foto ? req.files.foto[0].filename : "";
  data.audio = req.files?.audio ? req.files.audio[0].filename : "";

  // ✅ KATEGORI: PRIORITAS DARI FORM, kalau kosong baru auto
  let kategori = (data.kategori || "").toString().trim();

  if (!kategori) {
    if (data.audio) {
      kategori = "Sound Production";
    } else if (data.link_video && String(data.link_video).trim() !== "") {
      kategori = "Videography";
    } else {
      kategori = "Photography";
    }
  }

  data.kategori = kategori;

  Works.create(data, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      message: "Work created",
      id: results.insertId,
      ...data,
    });
  });
};

// PUT (UPDATE)
exports.updateWork = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Works.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0)
      return res.status(404).json({ message: "Work not found" });

    const old = results[0];

    // FILES (prioritas: file baru > lama)
    data.foto = req.files?.foto
      ? req.files.foto[0].filename
      : old.foto || "";

    data.audio = req.files?.audio
      ? req.files.audio[0].filename
      : old.audio || "";

    // ✅ KATEGORI: form > DB lama > auto
    let kategori =
      (data.kategori || "").toString().trim() ||
      (old.kategori || "").toString().trim();

    // auto hanya jika masih kosong
    if (!kategori) {
      if (data.audio) {
        kategori = "Sound Production";
      } else if (data.link_video && String(data.link_video).trim() !== "") {
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

    Works.update(id, data, (err2, results2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (results2.affectedRows === 0)
        return res.status(404).json({ message: "Work not found" });

      res.json({ message: "Work updated", id, ...data });
    });
  });
};

// DELETE
exports.deleteWork = (req, res) => {
  const id = req.params.id;
  Works.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Work not found" });
    res.json({ message: "Work deleted", id });
  });
};
