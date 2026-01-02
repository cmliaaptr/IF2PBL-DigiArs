const express = require("express");
const router = express.Router();

const LayananController = require("../controllers/layanan.controller");
const uploadLayanan = require("../middlewares/uploadlayanan");
const auth = require("../../middlewares/auth");

router.get("/public", LayananController.getAllPublic);

router.get("/", auth, LayananController.getAllLayanan);
router.get("/:id", auth, LayananController.getLayananById);

router.post("/", auth, uploadLayanan.single("foto"), LayananController.createLayanan);
router.put("/:id", auth, uploadLayanan.single("foto"), LayananController.updateLayanan);
router.delete("/:id", auth, LayananController.deleteLayanan);

module.exports = router;
