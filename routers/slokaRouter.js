const express = require("express");
const slokaController = require("../controllers/slokaController");

const router = express.Router();

router.route("/").get(slokaController.getRandomSloka);
router.route("/:ch/:sl").get(slokaController.getSloka);
router.route("/getSloka").post(slokaController.getSloka);

module.exports = router;
