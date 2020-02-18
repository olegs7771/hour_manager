const express = require("express");
const router = express.Router();
const Project = require("../../models/Project");
const User = require("../../models/User");
const Employee = require("../../models/Employee");
const passport = require("passport");
const validateProjectInput = require("../validation/project");

//Create New Project
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("req.body", req.body);

    const { errors, isValid } = validateProjectInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // console.log("req.user", req.user);
    Project.findOne({ user: req.user.id }).then(project => {
      if (!project) {
        //No Project for user create on
        console.log("No Project for user create one");
        //Create New Project
        const newProject = {
          user: req.user.id,
          companyName: req.body.companyName,
          location: req.body.location,
          companyCoreFunc: req.body.companyCoreFunc,
          projectName: req.body.projectName
        };

        new Project(newProject).save().then(project => {
          //Add projectID to user.projects[]
          User.findById(project.user).then(user => {
            user.projects.unshift({
              _id: project._id,
              projectName: project.projectName,
              companyName: project.companyName
            });
            user.save().then(upUser => {
              console.log("upUser", upUser);
            });
          });

          return res.status(200).json(project);
        });
      } else {
        //user already has projects
        console.log("user already has projects");
        if (project.projectName === req.body.projectName) {
          return res
            .status(200)
            .json({ message: "Such a project name already exists" });
        }
        //Create New Project
        const newProject = {
          user: req.user.id,
          companyName: req.body.companyName,
          location: req.body.location,
          companyCoreFunc: req.body.companyCoreFunc,
          projectName: req.body.projectName
        };

        new Project(newProject).save().then(project => {
          //Add projectID to user.projects[]
          User.findById(project.user).then(user => {
            user.projects.unshift({
              _id: project._id,
              projectName: project.projectName,
              companyName: project.companyName
            });
            user.save().then(upUser => {
              console.log("upUser", upUser);
            });
          });

          return res.status(200).json(project);
        });
      }
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

//Delete project
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.body.id).then(project => {
      if (!project) {
        return res.status(400).json({ error: "Project not found" });
      }
      project.remove().then(() => {
        //Delete project in User.projects[];
        User.findById(project.user).then(user => {
          const projectsLeft = user.projects.filter(item => {
            return item.projectName !== project.projectName;
          });
          user.projects = projectsLeft;
          user.save().then(upUser => {
            res.status(200).json(upUser);
          });
        });
        //Delete All Employees within this Project
        Employee.find().then(employees => {
          const employeesLeft = employees.filter(item => {
            return item.projectID !== project._id;
          });
          employeesLeft.save().then(() => {
            console.log("users been deleted");
          });
        });
      });
    });
  }
);

module.exports = router;
