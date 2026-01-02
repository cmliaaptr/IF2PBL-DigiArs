const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const auth = require("../../middlewares/auth");
const ctrl = require("../controllers/detail_layanan.controller");

// storage setup
const UPLOAD_DIR = path.join(process.cwd(), "storage", "detail_layanan");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

// HERO
router.get("/:layananId/hero", ctrl.getHeroByLayanan);
router.put(
  "/:layananId/hero",
  auth,
  upload.single("foto"), 
  ctrl.upsertHeroByLayanan
);

// BENEFITS
router.get("/:layananId/benefits", ctrl.getBenefitsByLayanan);
router.put(
  "/:layananId/benefits",
  auth,
  upload.single("icon"), 
  ctrl.upsertBenefitByLayanan
);

module.exports = router;
