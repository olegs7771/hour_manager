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
    console.log("req.body", req.body);

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
          projectName: req.body.projectName,
          workDayHours: {
            start: req.body.jobStart,
            end: req.body.jobEnd
          }
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

          res.status(200).json({ message: "Project was created" });
        });
      } else {
        //user already has projects
        // console.log("user already has projects");

        // console.log("project.projectName ", project.projectName);
        // console.log("req.body.projectName ", req.body.projectName);

        if (project.projectName === req.body.projectName) {
          return res
            .status(400)
            .json({ projectName: "Such a project name already exists" });
        }
        //Create New Project
        const newProject = {
          user: req.user.id,
          companyName: req.body.companyName,
          location: req.body.location,
          companyCoreFunc: req.body.companyCoreFunc,
          projectName: req.body.projectName,
          workDayHours: {
            start: req.body.jobStart,
            end: req.body.jobEnd
          }
        };

        new Project(newProject).save().then(project => {
          //Add projectID to user.projects[]
          User.findById(project.user).then(user => {
            user.projects.unshift({
              _id: project._id,
              projectName: project.projectName,
              companyName: project.companyName
            });
            user
              .save()
              .then(upUser => {
                console.log("upUser", upUser);
              })
              .catch(err => {
                console.log("error to update user", err);
              });
          });

          res.status(200).json({ message: "Project was created" });
        });
      }
    });
  }
);

//Find project
router.get(
  "/fetch",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("req.user.id", req.user.id);

    Project.find({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then(project => {
        if (!project) {
          return res.status(200).json({ project });
        }
        // console.log("project", project);
        res.status(200).json({ project });
      })
      .catch(err => {
        console.log("project error :", err);
      });
  }
);

//Get Selected Project by ID
//Private Router
router.post(
  "/get_project",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.body.id)
      .populate("user", ["name"])
      .then(project => {
        if (!project) {
          return res.status(400).json({ error: "Can not find project" });
        }
        res.json(project);
        // console.log("projejct", project);
      });
  }
);

//Delete project + employess + remove project from user.projects[]
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.body.id).then(project => {
      if (!project) {
        return res.status(400).json({ error: "Project not found" });
      }
      // console.log("project", project);

      project.remove().then(projectRemoved => {
        //Delete project in User.projects[];
        User.findById(project.user).then(user => {
          const projectsLeft = user.projects.filter(item => {
            return item.projectName !== projectRemoved.projectName;
          });
          user.projects = projectsLeft;
          user.save().then(upUser => {
            console.log("upUser", upUser);

            res.status(200).json(upUser);
          });
        });
        //Delete All Employees within this Project
        Employee.find()
          .populate("projectID", ["companyName", "projectName"])
          .then(employees => {
            console.log("employees ", employees);
            employees.map(employee => {
              Employee.findOneAndDelete({
                projectID: project._id
              }).then(employeeDeleted => {
                console.log("employeeDeleted", employeeDeleted);
                res
                  .status(200)
                  .json({ message: "Project was deleted successfully" });
              });
            });
          });
      });
    });
  }
);

//Update Project
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findOne({ user: req.user.id }).then(project => {
      if (!project) {
        return res.status(400).json({ error: "No such a project" });
      }
      console.log("project", project);
      project.companyName = req.body.companyName;
      project.location = req.body.location;
      project.companyCoreFunc = req.body.companyCoreFunc;
      project.save().then(upProject => {
        console.log("upProject", upProject);
        res.status(200).json({ message: "Project was updated" });
      });
    });
  }
);

//Get All Employess by projectID

router.post(
  "/get_employees_all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.body.id).then(project => {
      if (!project) {
        return res
          .status(400)
          .json({ error: "Project was deleted or not exist" });
      }

      // console.log("project", project.staff);
      res.json(project.staff);
    });
  }
);

router.post(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.find().then(projects => {
      res.json(projects);
    });
  }
);

module.exports = router;
