const Sloka = require("../modals/slokaModal");
const AppError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");

module.exports.getRandomSloka = catchAsync(async (req, res, next) => {
  const rand = Math.floor(Math.random() * 47 + 1);

  const sloka = await Sloka.findOne({ slokaNumber: rand });

  if (!sloka) return new AppError("No sloka found", 404);

  res.status(200).json({
    status: "success",
    sloka,
  });
});

module.exports.getSloka = catchAsync(async (req, res, next) => {
  const sloka = await Sloka.findOne({
    chapter: req.params.ch,
    slokaNumber: req.params.sl,
  });

  if (req.params.ch > 1) return next(new AppError("No document found", 404));
  if (req.params.sl > 47) return next(new AppError("No document found", 404));

  if (!sloka) return new AppError("No sloka found", 404);

  res.status(200).json({
    status: "success",
    sloka,
  });
});

module.exports.getSloka = catchAsync(async (req, res, next) => {
  const { chapter, slokaNumber } = req.body;

  const sloka = await Sloka.findOne({
    chapter: chapter,
    slokaNumber: slokaNumber,
  });

  // if (chapter > 1) return next(new AppError("No document found", 404));
  // if (slokaNumber > 47) return next(new AppError("No document found", 404));

  if (!sloka) return new AppError("No sloka found", 404);

  res.status(200).json({
    status: "success",
    sloka,
  });
});
