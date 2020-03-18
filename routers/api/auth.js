const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
// const passport = require("passport");
const User = require("../../models/User");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const sendMail = require("../../utils/mail/MailTransporter");

router.get("/test", (req, res) => {
  // res.render("index", {
  //   data: { name: req.query["name"] }
  // });
});

//Registration
router.post("/register", (req, res) => {
  //Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  console.log("errors", errors);
  console.log("isValid", isValid);
  if (!isValid) {
    return res.status(500).json(errors);
  }

  const email = req.body.email;
  User.findOne({ email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ error: "User with such email already exists." });
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
      //Not hashing password in temp account
      // bcrypt.genSalt(10, (err, salt) => {
      // bcrypt.hash(req.body.password, salt, (err, hash) => {
      // if (err) {
      //   return res.status(400).json({ error: err });
      // }
      // Store hash in  password DB.
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        password: req.body.password,
        token
      });
      newUser.save().then(user => {
        console.log("temp user created", user);
        let URLString;
        if (process.env.NODE_ENV === "production") {
          URLString = `https://glacial-crag-30370.herokuapp.com/api/auth/confirm_registration?id=${user.id}&token=${user.token}`;
        } else {
          URLString = `http://localhost:5000/api/auth/confirm_registration?id=${user.id}&token=${user.token}`;
        }

        console.log("URLString", URLString);

        //create data object for mailer trasporter
        // let urlConfirm;
        // if (process.env.NODE_ENV !== "production") {
        //   urlConfirm = `https://localhost:3000/confirm_registration/${user.token}/${user._id}`;
        // } else {
        //   urlConfirm = `https://morning-thicket-46114.herokuapp.com/confirm_registration/${user.token}/${user._id}`;
        // }

        const data = {
          type: "REGISTER",
          token: user.token,
          name: user.name,
          email: user.email,
          url: URLString
        };

        sendMail(data, cb => {
          if (cb.infoMessageid) {
            res.status(200).json({
              message:
                "Success! Thank You for Registering on HourManager. Please check your email to confirm registration. "
            });
          }
        });
      });
      // });
      // });
    });
  });
});

// @desc /Confirmation of New User from Email URL with params
// @route POST /api/users/confirm_registration/:token
// @access Public

router.get("/confirm_registration", (req, res) => {
  const uid = req.query["id"];
  const token = req.query["token"];
  // console.log("uid", uid);
  // console.log("token", token);
  User.findOne({ _id: uid }).then(user => {
    if (!user) {
      return res
        .status(200)
        .json({ message: "No account for this email exists" });
    }
    //confirmed:true
    if (user.confirmed) {
      return res
        .status(200)
        .json({ message: "Account for this email alredy has been confirmed" });
    }
    console.log("user found", user);

    //Update Temp User to Verified user and hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        // Store hash in  password DB.
        const set = {
          confirmed: true,
          token: null,
          password: hash
        };
        User.updateMany({
          $set: set
        })
          .then(() => {
            User.findOne({ email: user.email }).then(upUser => {
              //Here Updated and Confirmed User
              res.render("confirm.ejs", {
                data: {
                  name: upUser.name,
                  email: upUser.email,
                  password: user.password
                }
              });

              console.log("upUser", upUser);
            });
          })
          .catch(err => {
            console.log("cant update", err);
          });
      });
    });
  });
});
// // @desc /Login User
// // @route POST /api/User/login
// // @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with such email does not exist" });
    }
    //User Found
    bcrypt.compare(req.body.password, user.password).then(match => {
      if (!match) {
        return res
          .status(400)
          .json({ password: "Password Email invalid pair" });
      }
      //Password matched, prepare token 2h exp time

      // console.log("user", user);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        date: user.date
      };
      jwt.sign(payload, keys, { expiresIn: 7200 }, (err, token) => {
        if (err) {
          return res.status(400).json({ message: "something wrong" });
        }
        res.status(200).json({ token: `bearer ${token}` });
      });
    });
  });
});

module.exports = router;
