const express = require('express');
const router = express.Router();
const LayananController = require('../controllers/layanan.controller');
const uploadLayanan = require('../middlewares/uploadlayanan');

// Routing standar REST API
router.get('/', LayananController.getAllLayanan); //get all
router.get('/:id', LayananController.getLayananById); //get by id
router.post('/', uploadLayanan.single("foto"), LayananController.createLayanan); //create
router.put('/:id', uploadLayanan.single("foto"), LayananController.updateLayanan); //update
router.delete('/:id', LayananController.deleteLayanan); //delete

module.exports = router;