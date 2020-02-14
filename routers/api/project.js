const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const User = require("../../models/User");
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
      user: req.user.id,
      companyName: req.body.companyName,
      location: req.body.location,
      companyCoreFunc: req.body.companyCoreFunc
    };

    new Project(newProject).save().then(project => {
      return res.status(200).json(project);
    });
  }
);

//Find project
router.get("/getById", (req, res) => {
  Project.findById(req.body.id)
    .populate("user", ["name", "email"])
    .then(project => {
      if (!project) {
        return res
          .status(400)
          .json({ error: "Project not found for this user" });
      }
      console.log("project", project);
    })
    .catch(err => {
      console.log("project error :", err);
    });
});

//Add New Employee to the Project

module.exports = router;
