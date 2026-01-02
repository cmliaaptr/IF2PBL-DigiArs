const express = require("express");
const router = express.Router();

const settingController = require("../controllers/setting.controller");
const auth = require("../../middlewares/auth"); 

router.get("/public", settingController.getPublic);

router.get("/", auth, settingController.getMySetting);
router.put("/", auth, settingController.saveMySetting);

module.exports = router;
