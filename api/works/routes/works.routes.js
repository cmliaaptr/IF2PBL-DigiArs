const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");
const worksController = require("../controllers/works.controller");
const uploadWorks = require("../middlewares/uploadworks");

router.get("/", worksController.getAllWorks);     
router.get("/:id", worksController.getWorkById);  

router.get("/admin/list", auth, worksController.getAllWorksAdmin);
router.get("/admin/:id", auth, worksController.getWorkByIdAdmin);

router.post(
  "/",
  auth,
  uploadWorks.fields([
    { name: "foto", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  worksController.createWork
);

router.put(
  "/:id",
  auth,
  uploadWorks.fields([
    { name: "foto", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  worksController.updateWork
);

router.delete("/:id", auth, worksController.deleteWork);

module.exports = router;
