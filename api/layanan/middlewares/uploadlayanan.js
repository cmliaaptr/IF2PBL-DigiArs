const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ROOT PROJECT /storage/layanan
const UPLOAD_DIR = path.resolve(process.cwd(), "storage", "layanan");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `layanan-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

module.exports = multer({ storage });
