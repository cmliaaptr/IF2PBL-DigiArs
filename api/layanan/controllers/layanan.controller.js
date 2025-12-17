const Layanan = require("../../layanan/models/layanan.model");

exports.getAllLayanan = (req, res) => {
  Layanan.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // fallback kategori jika kosong
    const fixed = results.map((l) => ({
      ...l,
      kategori:
        l.kategori && l.kategori.trim() !== ""
          ? l.kategori
          : "Photography",
    }));

    res.json(fixed);
  });
};

// GET BY ID
exports.getLayananById = (req, res) => {
  const id = req.params.id;

  Layanan.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0)
      return res.status(404).json({ message: "Layanan not found" });

    res.json(results[0]);
  });
};

// CREATE
exports.createLayanan = (req, res) => {
  const data = req.body;

  // FILE (FOTO SAJA)
  data.foto = req.file ? req.file.filename : "";

  // KATEGORI: PRIORITAS DARI FORM
  let kategori = (data.kategori || "").toString().trim();

  if (!kategori) {
    if (data.link_video && String(data.link_video).trim() !== "") {
      kategori = "Videography";
    } else {
      kategori = "Photography";
    }
  }

  data.kategori = kategori;

  Layanan.create(data, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Layanan created",
      id: results.insertId,
      ...data,
    });
  });
};

// UPDATE
exports.updateLayanan = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Layanan.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!results || results.length === 0)
      return res.status(404).json({ message: "Layanan not found" });

    const old = results[0];

    // FOTO: file baru > lama
    data.foto = req.file ? req.file.filename : old.foto || "";

    // KATEGORI: form > DB lama > auto
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

    Layanan.update(id, data, (err2, results2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (results2.affectedRows === 0)
        return res.status(404).json({ message: "Layanan not found" });

      res.json({ message: "Layanan updated", id, ...data });
    });
  });
};

// DELETE
exports.deleteLayanan = (req, res) => {
  const id = req.params.id;

  Layanan.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Layanan not found" });

    res.json({ message: "Layanan deleted", id });
  });
};
