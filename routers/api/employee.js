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
    //Find Project
    Project.findById(req.body.projectID)
      .then(project => {
        console.log("project found");
        //Find Employee
        Employee.findOne({ email: req.body.email })
          .then(employee => {
            return console.log("employee found");
          })
          .catch(() => {
            return console.log("employee not found");
          });
      })
      .catch(() => {
        return res
          .status(400)
          .json({ error: "Can not find Project with given ID" });
      });
  }
);

module.exports = router;
