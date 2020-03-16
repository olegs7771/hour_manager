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
        timeEnd: req.body.timeEnd
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
    console.log("test req.body ", req.body);

    let dateFilter = {
      $lt: new Date(req.body.date + "T23:59:59"),
      $gt: new Date(req.body.date + "T00:00:00")
    };

    JobDay.findOne({ date: dateFilter }).then(day => {
      if (!day)
        return res.json({
          message: "No Data for this date.",
          date: req.body.date
        });

      if (day.employee.toString() === req.body.employeeID) {
        return res.json(day);
      } else {
        res.json({ message: "no jobdays for this employee" });
      }
    });
  }
);

//Find Array of Jobdays for selected Month
//Private Route

router.post(
  "/jobdays_month",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    //Find Employee
    Employee.findById(req.body.employeeID).then(employee => {
      if (!employee)
        return res.status(400).json({ error: "Employee not exists" });
      console.log("employee found");

      //Find workDayHours limits in Project for control
      Project.findById(req.body.projectID).then(project => {
        const startHour = project.workDayHours.start;
        const endHour = project.workDayHours.end;

        //$lt= 1 day of month from T00:00:01  (2020-01-01)
        //$gt = last day of month till T23:59:59

        const dateFilter = {
          $gt: new Date(req.body.date.startdate),
          $lt: new Date(req.body.date.enddate)
        };

        JobDay.find({ date: dateFilter }).then(days => {
          if (!days) return res.json({ message: "No days" });
          res.json({ days, hours: { startHour, endHour } });
        });
      });
    });
  }
);

module.exports = router;
