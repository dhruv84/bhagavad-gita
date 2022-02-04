const User = require("../modals/userModal");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

const filterObject = (object, ...elements) => {
  let newObj = {};
  Object.keys(object).forEach((el) => {
    if (elements.includes(el)) newObj[el] = object[el];
  });
  return newObj;
};

exports.getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("Please provide correct data", 404));
  }

  const filteredObj = filterObject(req.body, "email", "name");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser)
    return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.updateContinue = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { continue: req.body.link },
    {
      new: true,
    }
  );

  if (!updatedUser)
    return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) return next(new AppError("No document found with that ID", 404));

  res.clearCookie("jwt");

  res.status(204).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUserNew = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      newUser: false,
    },
    { new: true }
  );

  if (!updatedUser)
    return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
