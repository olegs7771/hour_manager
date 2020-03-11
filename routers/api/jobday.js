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

//Find All jobdays for selected employee
//Private Route
let selecteddays = [];
router.post(
  "/get_jobdays",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    JobDay.find({ employee: req.body.employeeID })
      .then(jobdays => {
        if (!jobdays)
          return res.status(200).json({ message: "No jobdays to show" });
        res.json(jobdays);
        console.log("job days found");
        //Filter only days of Current Month

        jobdays.forEach(day => {
          console.log("day.date", day.date);

          // console.log("day.date", parseInt(moment(day.date).format("X"), 10));
          if (
            parseInt(moment(day.date).format("X"), 10) >=
            parseInt(
              moment()
                .startOf("month")
                .format("X"),
              10
            )
          ) {
            //<= March 7, 2020
            selecteddays.push(day);
          }
        });
        console.log("selecteddays", selecteddays);
      })
      .catch(err => {
        console.log("err", err);
      });
  }
);

//Get One Selected Day
//Private Route

router.post(
  "/get_day",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    JobDay.findOne({ date: { $gte: new Date(req.body.date) } })
      .then(day => {
        if (!day) return console.log("no date");

        console.log("day".day);
      })
      .catch(err => {
        console.log("err:", err);
      });
  }
);

module.exports = router;
