const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const favController = require("../controllers/favouriteController");

const router = express.Router();

//router??For all
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/signup").post(authController.signup);
router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/resetPassword/:token").post(authController.resetPassword);

//router??For User only
router.use(authController.protect);

router
  .route("/createFavourites")
  .post(favController.setUserID, favController.createFavourite);

router.route("/removeFavourites").delete(favController.removeFavourite);

router.route("/updateMe").patch(userController.updateMe);
router.route("/updatePassword").patch(authController.updatePassword);
router.route("/updateContinue").patch(userController.updateContinue);
router.route("/updateUserNew").patch(userController.updateUserNew);
router.route("/deleteMe").delete(userController.deleteUser);

//router??For Admin
router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUser);

router.route("/getFavourites").get(favController.getAllFavourites);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
