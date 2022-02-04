const User = require("../modals/userModal");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const Email = require("../utilities/email");

const getJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = getJwtToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EX_DATE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: req.secure || req.headers("x-forwarded-proto") === "https",
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//Signup
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 200, req, res);
});

//Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  //check if the user exists or password is incorrect
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("password or email is incorrect", 401));
  }

  //send user token
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res, next) => {
  if (req.cookies.jwt) {
    res.clearCookie("jwt");
    res.status(200).json({ status: "success" });
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("Please login to get access", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).populate({
    path: "userFav",
  });

  //cehck if user exists
  if (!currentUser)
    return next(
      new AppError("User belonging to the token does not exist", 401)
    );

  //check if user changed password
  if (currentUser.isPasswordChanged(decoded.iat)) {
    return next(
      new AppError("User recently changed password, please login again!", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const currentUser = await User.findById(decoded.id).populate({
      path: "userFav",
    });

    if (!currentUser) return next();

    if (currentUser.isPasswordChanged(decoded.iat)) return next();

    res.locals.user = currentUser;

    return next();
  }

  next();
});

exports.restrictAdditionalLogin = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return next(
      new AppError(
        "You are already logged in, you need to logout to perform this action!",
        401
      )
    );
  } else {
    next();
  }
});

exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(
        new AppError("You dont have permission to do this action", 403)
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1.check if the user exists
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError(
        "Please provide correct email, or the user doesn't exist!",
        404
      )
    );
  }

  // 2.generate random reset token
  const resetToken = user.createResetPasswordToken();

  // 3.saving the modified user
  await user.save({ validateBeforeSave: false });

  //4. send email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendResetPassword();

    res.status(200).json({
      status: "success",
      message: "Mail has been sent!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExDate = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "Unable to send the mail right now, please try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExDate: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has been expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExDate = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, passwordConfirm } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.comparePassword(passwordCurrent, user.password))) {
    return next(new AppError("Please provide the same password!", 401));
  }

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});
