const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
const app = express();
const moment = require("moment");

//Routes
const employee = require("./routers/api/employee");
const auth = require("./routers/api/auth");
const project = require("./routers/api/project");
const jobday = require("./routers/api/jobday");
const rnapp = require("./routers/api/rnapp");

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
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected to ${db}`))
  .catch((err) => console.log(err));

//Public Folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.setHeader("set-cookie", ["SameSite=Strict;SameSite=Strict"]);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// app.use(express.static(path.join(__dirname, "public")));

// Use Routes

app.use("/api/employee", employee);
app.use("/api/auth", auth);
app.use("/api/project", project);
app.use("/api/jobday", jobday);
app.use("/api/rnapp", rnapp);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`HourManager listening on port  ${port}`);
});
console.log("NODE_ENV", process.env.NODE_ENV);

//Exercises
const reg = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

const str = "20:02";

console.log("test regex :", reg.test(str));
