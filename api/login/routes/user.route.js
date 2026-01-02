const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../../middlewares/auth")

router.post("/", userController.login);

module.exports = router;