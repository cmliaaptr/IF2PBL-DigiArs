const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "storage/works"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `work-${Date.now()}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
  cb(ok ? null : new Error("Hanya JPG/PNG/WEBP"), ok);
};

module.exports = multer({ storage, fileFilter });
