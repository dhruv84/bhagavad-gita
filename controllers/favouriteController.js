const Favourite = require("../modals/favouritesModal");
const AppError = require("../utilities/appError");
const catchAsync = require("../utilities/catchAsync");

exports.setUserID = catchAsync(async (req, res, next) => {
  if (!req.body.userID) req.body.userID = req.user.id;
  next();
});

exports.getAllFavourites = catchAsync(async (req, res, next) => {
  const favourites = await Favourite.find();

  res.status(200).json({
    status: "success",
    data: {
      favourites,
    },
  });
});

exports.createFavourite = catchAsync(async (req, res, next) => {
  const { slokaID, userID, slug } = req.body;

  if (!slokaID || !userID || !slug)
    return next(new AppError("ID missing"), 401);

  const favourite = await Favourite.create({
    sloka: slokaID,
    user: userID,
    chapterName: slug,
  });

  res.status(200).json({
    status: "success",
    data: {
      favourite,
    },
  });
});

exports.removeFavourite = catchAsync(async (req, res, next) => {
  const { slokaID } = req.body;

  if (!slokaID) return next(new AppError("ID missing"), 401);

  const favourite = await Favourite.deleteOne({ sloka: slokaID });

  res.status(200).json({
    status: "success",
  });
});
