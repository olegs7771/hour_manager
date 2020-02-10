const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const passport = require("passport");
const Auth = require("../../models/Auth");
const validateRegisterInput = require("../validation/register");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Works!" });
});

//Registration
router.post("/register", (req, res) => {
  console.log("req.body", req.body);
  //Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log("errors", errors);
  console.log("isValid", isValid);
  if (!isValid) {
    return res.status(500).json(errors);
  }
  const email = req.body.email;
  Auth.findOne({ email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ message: "User with such email already exists." });
    }
    //user not exists , we can create new one
    //Create Token to send to newTempUser email .expiration in 12h
    const payload = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    };
    jwt.sign(payload, keys, { expiresIn: 43200 }, (err, token) => {
      if (err) {
        throw err;
      }
      // here we got tempToken  exp in 12h ,ready to send to new user
      //creating still not confirmed user
      //To hash a password:
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            return res.status(400).json({ error: err });
          }
          // Store hash in  password DB.
          const newUser = new Auth({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            location: req.body.location,
            password: hash,
            token
          });
          newUser.save().then(user => {
            console.log("temp user created", user);

            //create data object for mailer trasporter
            // let urlConfirm;
            // if (process.env.NODE_ENV !== "production") {
            //   urlConfirm = `https://localhost:3000/confirm_registration/${user.token}/${user._id}`;
            // } else {
            //   urlConfirm = `https://morning-thicket-46114.herokuapp.com/confirm_registration/${user.token}/${user._id}`;
            // }
          });
        });
      });
    });
  });
});

module.exports = router;
