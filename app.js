var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise
mongoose
    .connect("mongodb://localhost:27017/local", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected successful"))
    .catch(err => console.error(err));

// mongoose
//   .connect(
//     "mongodb+srv://Joylish:1234@abouturday-dmood.mongodb.net/AboutURDay?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     }
//   )
//   .then(() => console.log("mongoDB connected successful"))
//   .catch(err => console.error(err));
const conn = mongoose.connection;
mongoose.Promise = global.Promise;

var indexRouter = require("./routes/index");
var diariesRouter = require("./routes/diaries");
var usersRouter = require("./routes/users");
var app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/diary", diariesRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.all("/*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

//   next();
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
