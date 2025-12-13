const express = require('express');
const router = express.Router();
const worksController = require('../controllers/works.controller');

// Routing standar REST API
router.get('/', worksController.getAllWorks); //get all
router.get('/:id', worksController.getWorkById); //get by id
router.post('/', worksController.createWork); //create
router.put('/:id', worksController.updateWork); //update
router.delete('/:id', worksController.deleteWork); //delete

module.exports = router;