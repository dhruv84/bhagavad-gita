const catchAsync = require("../utilities/catchAsync");
const Chapter = require("../modals/chapterModal");
const AppError = require("../utilities/appError");

module.exports.getAllChapters = catchAsync(async (req, res, next) => {
  const chapters = await Chapter.find();

  res.status(200).json({
    status: "success",
    data: {
      chapters,
    },
  });
});

module.exports.getChapter = catchAsync(async (req, res, next) => {
  const chapter = await Chapter.findById(req.params.id).populate({
    path: "slokas",
    options: { sort: { slokaNumber: 1 } },
  });

  if (!chapter) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      chapter,
    },
  });
});
