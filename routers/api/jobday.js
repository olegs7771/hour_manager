const express = require("express");
const router = express.Router();
const JobDay = require("../../models/Jobday");
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const moment = require("moment");

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
        timeEnd: req.body.timeEnd,
        weekday: req.body.weekday
      });
      newJobday.save().then(jobday => {
        res.json(jobday);
        console.log("jobday created");
      });
    });
  }
);

//Find Selected Job Day
//Private Route

router.post(
  "/get_jobday",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Selected
    // console.log("test req.body ", req.body.date);

    let dateFilter = {
      $lt: new Date(req.body.date + "T23:59:59"),
      $gt: new Date(req.body.date + "T00:00:00")
    };

    JobDay.find({ date: dateFilter }).then(day => {
      if (!day) return res.json({ error: "No day been found" });
      res.json(day);
    });
  }
);

module.exports = router;
