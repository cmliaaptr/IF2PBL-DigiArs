const express = require('express');
const router = express.Router();
const worksController = require('../controllers/works.controller');
const uploadWorks = require('../middlewares/uploadworks');

// Routing standar REST API
router.get('/', worksController.getAllWorks); //get all
router.get('/:id', worksController.getWorkById); //get by id
router.post("/", uploadWorks.fields([{name : "foto", maxCount : 1}, {name : "audio", maxCount : 1}]), worksController.createWork);
router.put("/:id", uploadWorks.fields([{name : "foto", maxCount : 1}, {name : "audio", maxCount : 1}]), worksController.updateWork);
router.delete('/:id', worksController.deleteWork); //delete

module.exports = router;