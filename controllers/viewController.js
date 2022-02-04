const Chapter = require("../modals/chapterModal");
const Sloka = require("../modals/slokaModal");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

module.exports.renderChapters = catchAsync(async (req, res, next) => {
  const chapters = await Chapter.find();

  if (!chapters) return next(new AppError("Page not found", 404));

  res.status(200).render("gitaAllChapter", {
    title: "All Chapters",
    chapters,
  });
});

module.exports.renderChaptersEng = catchAsync(async (req, res, next) => {
  const chapters = await Chapter.find();

  if (!chapters) return next(new AppError("Page not found", 404));

  res.status(200).render("gitaAllChaptersEng", {
    title: "All Chapters",
    chapters,
  });
});

module.exports.renderChapter = catchAsync(async (req, res, next) => {
  const page = req.params.page || 1;
  const limit = 2;
  const skip = (page - 1) * limit;

  const chapter = await Chapter.findOne({ slug: req.params.slug }).populate({
    path: "slokas",
    options: { sort: { slokaNumber: 1 }, skip: skip, limit: limit },
  });

  const slokaLength = Math.ceil(chapter.sloka_length / 2);

  if (!chapter) return next(new AppError("Page not found", 404));

  res.status(200).render("chapter", {
    title: chapter.slug,
    chapter,
    page,
    slokaLength,
  });
});

module.exports.renderLoginForm = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
};

module.exports.renderSignupForm = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Signup",
  });
};

module.exports.renderProfile = (req, res, next) => {
  res.status(200).render("profile", {
    title: "Profile",
  });
};

module.exports.renderForgetForm = (req, res, next) => {
  res.status(200).render("forgetPassword", {
    title: "Forget Password",
  });
};

module.exports.renderMaya = (req, res, next) => {
  res.status(200).render("maya", {
    title: "Maya",
  });
};

module.exports.renderResetForm = (req, res, next) => {
  const { token } = req.params;

  res.status(200).render("resetPassword", {
    title: "Reset Password",
    token,
  });
};
