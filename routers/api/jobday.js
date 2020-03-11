const express = require("express");
const router = express.Router();
const JobDay = require("../../models/Jobday");
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");

const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    //Confirm Employee Id
    Employee.findById(req.body.employeeID).then(employee => {
      if (!employee)
        return res.status(400).json({ error: "Employee not found" });
    });
    console.log("employee found");
    //Confirm Project Exist
    Project.findById(req.body.projectID).then(project => {
      if (!project) return res.status(400).json({ error: "Project not found" });
      console.log("Project found");
      //Create New Jobday
      const newJobday = new JobDay({
        employee: req.body.employeeID,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd
      });
      newJobday.save().then(jobday => {
        res.json(jobday);
        console.log("jobday created");
      });
    });
  }
);

//Find All jobdays for selected employee
//Private Route
router.post(
  "/get_jobdays",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    JobDay.find({ employee: req.body.employyID }).then(jobdays => {
      if (!jobdays)
        return res.status(200).json({ message: "No jobdays to show" });
      res.json(jobdays);
    });
  }
);

module.exports = router;
