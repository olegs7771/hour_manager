const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
const app = express();
const moment = require("moment");

//Routes
const auth = require("./routers/api/auth");
const project = require("./routers/api/project");
const employee = require("./routers/api/employee");
const jobday = require("./routers/api/jobday");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//Passport Config  JWT Strategy
require("./config/passport")(passport);

//db config
const db = require("./config/keys").mongoDB;

//connect to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log(`connected to ${db}`))
  .catch(err => console.log(err));

//Public Folder
app.use(express.static(path.join(__dirname, "public")));

//Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// Use Routes

app.use("/api/auth", auth);
app.use("/api/project", project);
app.use("/api/employee", employee);
app.use("/api/jobday", jobday);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`HourManager listening on port  ${port}`);
});

//Exercises

console.log(
  "First day of month ",

  moment()
    .startOf("month")
    .format("LL")
);
console.log(
  "First day of month number",
  parseInt(
    moment()
      .startOf("month")
      .format("X"),
    10
  )
);

console.log(
  "Previous Month Start",
  moment("2020-03-11")
    .subtract(1, "months")
    .endOf("month")
    .format("YYYY-MM-DD")
);

console.log(
  "Last Day of month",

  moment()
    .endOf("month")
    .format("LL")
);

console.log(
  "Last Day of month number",
  parseInt(
    moment()
      .endOf("month")
      .format("X"),
    10
  )
);
