const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const moment = require("moment");
const validator = require("validator");

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
const db = process.env.MONGO_URI;

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

app.all('/',(req,res,next)=>{
console.log('req hourmanager headers',req.headers);
})

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
////
