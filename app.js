const express = require("express");

const AppError = require("./utilities/appError");
const path = require("path");
const hpp = require("hpp");
const xss = require("xss-clean");
const sanitizer = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const chapterRouter = require("./routers/chapterRouter");
const slokaRouter = require("./routers/slokaRouter");
const viewRouter = require("./routers/viewRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.enable("trust proxy");

//Setting the pug template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//Impletmenting cors
app.use(cors());

//serving the static files
app.use(express.static(path.join(__dirname, "src")));

//setting http headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https:", "http:", "data:", "ws:"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", "https:", "http:", "data:"],
      scriptSrc: ["'self'", "https:", "http:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "http:"],
      imgSrc: ["'self'", "data:", "blob:"],
    },
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests, please try again in an hour!",
});

app.use("/api", limiter);

//access for req body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(sanitizer());

app.use(xss());

app.use(hpp());

app.use(compression());

app.use("/", viewRouter);
app.use("/api/gita/chapters", chapterRouter);
app.use("/api/gita/sloka", slokaRouter);
app.use("/api/gita/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
