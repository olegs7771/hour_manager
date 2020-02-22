const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
const app = express();

//Routes
const auth = require("./routers/api/auth");
const project = require("./routers/api/project");
const employee = require("./routers/api/employee");

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

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`HourManager listening on port  ${port}`);
});

// const mainTime = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve("mainTime");
//     }, 5000);
//   });
// };

// const callTime = async () => {
//   console.log("waiting..");
//   const result = await mainTime();
//   console.log(result);
// };
// callTime();
