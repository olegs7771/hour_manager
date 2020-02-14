const express = require("express");
const router = express.Router();
//Models
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
const validateEmployeeInput = require("../validation/employee");

//Create New Employee
//Private Route
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmployeeInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    //Passed Validation
    new Employee({
      name: req.body.name,
      email: req.body.email,
      started: req.body.started,
      function: req.body.function
    })
      .save()
      .then(employee => {
        res.status(200).json(employee);
      });
  }
);

module.exports = router;
