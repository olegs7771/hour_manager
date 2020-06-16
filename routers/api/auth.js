const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const jwt_decode = require("jwt-decode");
// const passport = require("passport");
const User = require("../../models/User");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const sendMail = require("../../utils/mail/MailTransporter");

//1 New User Makes Registration
//2 New temp user created in mongoDB
//3 Admin receives notification about new user request
//4 Admin decides to approve or decline
//5 if approved new user verified account created

//Registration
router.post("/register", (req, res) => {
  //Validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(500).json(errors);
  }

  const email = req.body.email;
  User.findOne({ email }).then((user) => {
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
      password: req.body.password,
    };
    jwt.sign(payload, keys, { expiresIn: 43200 }, (err, token) => {
      if (err) {
        throw err;
      }

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        secretQuestion1: req.body.secretQuestion1,
        secretAnswer1: req.body.secretAnswer1,
        secretQuestion2: req.body.secretQuestion2,
        secretAnswer2: req.body.secretAnswer2,
        password: req.body.password,
        token,
      });
      newUser.save().then((user) => {
        console.log("temp user created", user);
        let URLString;
        if (process.env.NODE_ENV === "production") {
          URLString = `https://glacial-crag-30370.herokuapp.com/confirm/${user.id}/${user.token}`;
        } else {
          URLString = `http://localhost:3000/confirm/${user.id}/${user.token}`;
        }

        console.log("URLString", URLString);

        const data = {
          type: "REGISTER",
          token: user.token,
          name: user.name,
          email: user.email,
          url: URLString,
        };

        sendMail(data, (cb) => {
          if (cb.infoMessageid) {
            res.status(200).json({
              message:
                "Success! Thank You for Registering on HourManager. Please check your email to confirm registration. ",
            });
            //New user Received Confirmation
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

router.post("/confirm_registration", (req, res) => {
  User.findOne({ _id: req.body.id }).then((user) => {
    user.collection.getIndexes().then((indexes) => {
      console.log("indexes", indexes);
    });
    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ error: "No account for this email exists" });
    // }
    // //confirmed:true
    // if (user.confirmed) {
    //   return res
    //     .status(400)
    //     .json({ error: "Account for this email alredy has been confirmed" });
    // }
    // console.log("user found", user);
    // //Check if token in params match token in temp user
    // if (user.token !== req.body.token) {
    //   return res
    //     .status(400)
    //     .json({ error: "Invalid Credentials. Please repeat SignUp precess." });
    // }

    // //Update Temp User to Verified user and hash password
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(user.password, salt, (err, hash) => {
    //     if (err) {
    //       return res.status(400).json({ error: err });
    //     }
    //     // Store hash in  password DB.
    //     const set = {
    //       confirmed: true,

    //       // token: null,
    //       password: hash,
    //     };

    //     User.updateMany({
    //       $set: set,
    //     })
    //       .then(() => {
    //         User.findOne({ email: user.email }).then((upUser) => {
    //           //User Confirmed Registration confirmed===true

    //           //Send Notification Email to Admin
    //           //Create two URLs for Admin Email html
    //           //Use token for  EMAIL URL Admin security
    //           const token = upUser.token;
    //           console.log("token", token);

    //           //Create data obj for Admin URL
    //           const access = "true";

    //           console.log("access", access);

    //           let URL_Approve_ACCESS;

    //           if (process.env.NODE_ENV === "production") {
    //             URL_Approve_ACCESS = `https://glacial-crag-30370.herokuapp.com/admin/${token}/${access}`;
    //           } else {
    //             URL_Approve_ACCESS = `http://localhost:3000/admin/${token}/${access}`;
    //           }

    //           const dataAdmin = {
    //             type: "ADMIN",
    //             uname: upUser.name,
    //             uemail: upUser.email,
    //             uphone: upUser.phone,
    //             uaddress: upUser.location,
    //             udate: upUser.date,
    //             URL_Approve_ACCESS,

    //             //to in MailTransporter
    //             email: "olegs7771@gmail.com",
    //           };
    //           sendMail(dataAdmin, (cb) => {
    //             if (cb.infoMessageid) {
    //               console.log("Sent Message to Admin");
    //             }
    //           });

    //           //Here Updated and Confirmed User

    //           res.json({
    //             name: upUser.name,
    //             email: upUser.email,
    //             password: user.password,
    //           });
    //         });
    //       })
    //       .catch((err) => {
    //         console.log("cant update", err);
    //       });
    //   });
    // });
  });
});

//Route from AdminControl.js
//Params from Admin URL with access true
//Update Temp User approvedByAdmin:true
//Send Mail to New User with Notification
router.post("/admin", (req, res) => {
  //Decode Token
  const decoded = jwt_decode(req.body.token);
  console.log("decoded", decoded);
  User.findOne({ email: decoded.email }).then((user) => {
    if (!user) return res.status(400).json({ error: "Can not find user" });
    console.log("user", user);
    user.approvedByAdmin = true;
    user.token = null;
    user.save().then((upUser) => {
      console.log("upUser", upUser);
      //User Updated --> Send Email to user
      // Create URL ling to Login page
      let loginURL;
      if (process.env.NODE_ENV === "production") {
        loginURL = `https://glacial-crag-30370.herokuapp.com/login`;
      } else {
        loginURL = `http://localhost:3000/login`;
      }

      const data = {
        type: "PERMISSION",
        uname: upUser.name,
        email: upUser.email,
        url: loginURL,
      };

      sendMail(data, (cb) => {
        if (cb.infoMessageid) {
          console.log("Sent Message to User");
        }
        console.log("sent to user");
      });
    });
  });
});

//Checking if Email Exists onMouseLeave Event
router.post("/check_email", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(400).json({ error: "No such e-mail in our data storage" });
    }
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
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with such email does not exist" });
    }
    // Check for approvedByAdmin
    if (!user.approvedByAdmin) {
      return res.status(400).json({
        error:
          " Pending HourManager Admin Approve. If it takes longer than 24h since the signup , you free to contact us by Email.  Sorry for inconvenience.",
      });
    }

    //User Found
    console.log("req.body.password", req.body.password);

    bcrypt.compare(req.body.password, user.password).then((match) => {
      if (!match) {
        return res
          .status(400)
          .json({ password: "Password Email invalid pair" });
      }
      //Password matched, prepare token 8h exp time

      // console.log("user", user);

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        date: user.date,
      };
      jwt.sign(payload, keys, { expiresIn: 28800 }, (err, token) => {
        if (err) {
          return res.status(400).json({ message: "something wrong" });
        }
        res.status(200).json({ token: `bearer ${token}` });
      });
    });
  });
});

//Public Route
//Send Email to Admin
router.post("/sendEmailAdmin", (req, res) => {
  const data = {
    type: "CONTACT_ADMIN",
    email: "olegs7771@gmail.com",
    uname: req.body.name,
    uemail: req.body.email,
    text: req.body.text,
  };
  sendMail(data, (cb) => {
    if (cb.infoMessageid) {
      res.json({ message: "Your message was sent to Admin. Thank You" });
    }
  });
});

module.exports = router;
