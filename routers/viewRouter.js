const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

//router??For all
router
  .route("/login")
  .get(authController.restrictAdditionalLogin, viewController.renderLoginForm);
router
  .route("/signup")
  .get(authController.restrictAdditionalLogin, viewController.renderSignupForm);

router.route("/").get(authController.isLoggedIn, viewController.renderChapters);
router.route("/maya-ka-khel").get(viewController.renderMaya);

router.route("/forgetPassword").get(viewController.renderForgetForm);
router.route("/resetPassword/:token").get(viewController.renderResetForm);

router
  .route("/chapter/:slug/:page?")
  .get(authController.isLoggedIn, viewController.renderChapter);

//router??For User only
router
  .route("/profile")
  .get(authController.protect, viewController.renderProfile);

module.exports = router;
