const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const controller = require("../controllers/layananc.controllers");
const auth = require("../../middlewares/auth");

const UPLOAD_DIR = path.join(process.cwd(), "storage", "layananc");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const base = path
      .basename(file.originalname || "file", ext)
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, ""); 

    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
]);

const fileFilter = (req, file, cb) => {
  if (allowedTypes.has(file.mimetype)) return cb(null, true);
  return cb(new Error("File harus berupa gambar (jpg/png) atau video (mp4)"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

const handleUpload = (req, res, next) => {
  upload.single("foto")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || "Upload gagal" });
    }
    next();
  });
};

router.get("/public", controller.getAllPublic);
router.get("/public/:id", controller.getByIdPublic);

router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);

router.post("/", auth, handleUpload, controller.create);
router.put("/:id", auth, handleUpload, controller.update);
router.delete("/:id", auth, controller.remove);

module.exports = router;
