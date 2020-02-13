const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const passport = require("passport");
const validateProjectInput = require("../validation/project");

//Create New Project
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    const { errors, isValid } = validateProjectInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // console.log("req.user", req.user);

    //Create New Project
    const newProject = {
      managerName: req.user.name,
      companyName: req.body.companyName,
      location: req.body.location,
      companyCoreFunc: req.body.companyCoreFunc
    };

    new Project(newProject).save().then(project => {
      return res.status(200).json(project);
    });
  }
);

//Add New Employee to the Project

module.exports = router;
