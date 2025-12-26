const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/layananc.controllers");

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/layananc");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// FILTER FILE (FOTO & VIDEO)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("File harus berupa gambar (jpg/png) atau video (mp4)"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// ROUTES
router.get("/", controller.getAll);
router.post("/", upload.single("foto"), controller.create);
router.put("/:id", upload.single("foto"), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
