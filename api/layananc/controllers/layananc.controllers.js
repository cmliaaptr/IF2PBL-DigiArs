const db = require("../../db");

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM layananc ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { judul } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Foto wajib diisi" });
    }

    const foto = req.file.filename;

    await db.query(
      "INSERT INTO layananc (judul, foto) VALUES (?, ?)",
      [judul, foto]
    );

    res.json({ message: "Layanan card berhasil ditambahkan" });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul } = req.body;

    let query = "UPDATE layananc SET judul = ?";
    let params = [judul];

    if (req.file) {
      query += ", foto = ?";
      params.push(req.file.filename);
    }

    query += " WHERE id = ?";
    params.push(id);

    await db.query(query, params);

    res.json({ message: "Layanan card berhasil diupdate" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM layananc WHERE id = ?", [id]);

    res.json({ message: "Layanan card berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
