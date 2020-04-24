const express = require("express");
const router = express.Router();
const JobDay = require("../../models/Jobday");
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//Create JobDay For Employee By Manager
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);
    //Confirm Employee Id
    Employee.findById(req.body.employeeID).then((employee) => {
      if (!employee)
        return res.status(400).json({ error: "Employee not found" });
    });
    console.log("employee found");
    //Confirm Project Exist
    Project.findById(req.body.projectID).then((project) => {
      if (!project) return res.status(400).json({ error: "Project not found" });
      console.log("Project found");
      //Create New Jobday
      const newJobday = new JobDay({
        employee: req.body.employeeID,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
      });
      newJobday.save().then((jobday) => {
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
    console.log("test req.body get_jobday ", req.body);
    Project.findById(req.body.projectID).then((project) => {
      if (!project) {
        return res.status(400).json({ error: "No Project found" });
      }
      const startHour = project.workDayHours.start;
      const endHour = project.workDayHours.end;

      let dateFilter = {
        $lt: new Date(req.body.date + "T23:59:59"),
        $gt: new Date(req.body.date + "T00:00:00"),
      };

      JobDay.find({ date: dateFilter }).then((days) => {
        console.log("days", days);

        if (days.length === 0) {
          return res.json({
            message: "No Data for this date.",
            date: req.body.date,
          });
        }

        days.map((day) => {
          if (day.employee.toString() === req.body.employeeID) {
            return res.json({ day, hours: { startHour, endHour } });
          } else {
            res.json({ message: "no jobdays for this employee" });
          }
        });
      });
    });
  }
);

//Find Array of Jobdays for selected Month of Selected Employee
//Private Route

router.post(
  "/jobdays_month",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    //Find Employee
    Employee.findById(req.body.employeeID).then((employee) => {
      if (!employee)
        return res.status(400).json({ error: "Employee not exists" });

      //Find workDayHours limits in Project for control
      Project.findById(req.body.projectID).then((project) => {
        const startHour = project.workDayHours.start;
        const endHour = project.workDayHours.end;

        //$lt= 1 day of month from T00:00:01  (2020-01-01)
        //$gt = last day of month till T23:59:59

        const dateFilter = {
          $gt: new Date(req.body.date.startdate),
          $lt: new Date(req.body.date.enddate),
        };

        JobDay.find({ date: dateFilter }).then((days) => {
          if (!days) return res.json({ message: "No days" });
          //filter days only for selected Employee
          const selectedDays = days.filter((day) => {
            return day.employee.toString() === req.body.employeeID;
          });
          console.log("selectedDays", selectedDays);
          if (selectedDays.length === 0) {
            return res.json({
              message: "No Job Days in this month",
              hours: { startHour, endHour },
            });
          }
          //Sort by date
          // const sortedActivities = selectedDays.sort((a, b) => b.date - a.date)

          res.json({ selectedDays, hours: { startHour, endHour } });
        });
      });
    });
  }
);

//Manager Confirms Hours Pair
//Route Private
router.post(
  "/manager_confirm",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Selected
    console.log("test req.body ", req.body);
    //create date string (YYYY-MM-DD)
    const dateStr = moment(req.body.selectedDay.date).format("YYYY-MM-DD");

    let dateFilter = {
      $lt: new Date(dateStr + "T23:59:59"),
      $gt: new Date(dateStr + "T00:00:00"),
    };

    JobDay.find({ date: dateFilter }).then((days) => {
      if (days.legth === 0) {
        return res.json({
          message: "No Data for this date.",
          date: req.body.date,
        });
      }
      console.log("days", days);
      //Filter found days by EmployeeID
      const filteredDays = days.filter((day) => {
        return day.employee !== req.body.selectedDay.employee;
      });
      console.log("filteredDays", filteredDays);
      filteredDays.map((day) => {
        day.confirmManager = true;
        day.save().then((upDay) => {
          res.json({ day: upDay, hours: req.body.hoursLimit });
        });
      });
    });
    //     days.map((day) => {
    //       if (day.employee.toString() === req.body.employeeID) {
    //         return res.json({ day, hours: { startHour, endHour } });
    //       } else {
    //         res.json({ message: "no jobdays for this employee" });
    //       }
    //     });
    //   });
  }
);

module.exports = router;
