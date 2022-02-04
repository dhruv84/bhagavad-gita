const express = require("express");
const chapterController = require("./../controllers/chapterController");

const router = express.Router();

router.route("/").get(chapterController.getAllChapters);
router.route("/:id").get(chapterController.getChapter);

module.exports = router;
