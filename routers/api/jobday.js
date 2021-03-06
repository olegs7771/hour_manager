const express = require("express");
const router = express.Router();
const JobDay = require("../../models/Jobday");
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");

const passport = require("passport");
// const jwt = require("jsonwebtoken");
const moment = require("moment");

//Create JobDay For Employee By Manager
// router.post(
//   "/create",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log("req.body", req.body);
//     //Confirm Employee Id
//     Employee.findById(req.body.employeeID).then((employee) => {
//       if (!employee)
//         return res.status(400).json({ error: "Employee not found" });
//     });
//     console.log("employee found");
//     //Confirm Project Exist
//     Project.findById(req.body.projectID).then((project) => {
//       if (!project) return res.status(400).json({ error: "Project not found" });
//       console.log("Project found");
//       //Create New Jobday
//       const newJobday = new JobDay({
//         employee: req.body.employeeID,
//         managerID: req.body.managerID,
//         timeStart: req.body.timeStart,
//         timeEnd: req.body.timeEnd,
//       });
//       newJobday.save().then((jobday) => {
//         res.json(jobday);
//         console.log("jobday created", jobday);
//       });
//     });
//   }
// );

//Find Selected Job Day
//Private Route

router.post(
  "/get_jobday",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Selected
    console.log(" req.body get_jobday ", req.body);
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
      //Search for all jobdays of current Employee

      JobDay.find({ date: dateFilter }).then((days) => {
        console.log("days", days);

        if (days.length === 0) {
          return res.json({
            message: "No Data for this date.",
            date: req.body.date,
          });
        }

        //Found jobdays for current date
        //Check jobday for current Employee
        const dayFound = days.find((day) => {
          return day.employee.toString() === req.body.employeeID;
        });
        console.log("dayFound", dayFound);
        if (!dayFound) {
          return res.json({ message: "no jobdays for this employee" });
        }
        res.json({ day: dayFound, hours: { startHour, endHour } });
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
    // console.log("req.body", req.body);

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
          // console.log("selectedDays", selectedDays);
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
  }
);
//Manager Cancel Confirmation(changed his mind)
//Route Private
router.post(
  "/manager_confirm_cancel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Selected
    console.log(" req.body manager_confirm_cancel", req.body);
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
        day.confirmManager = false;
        day.save().then((upDay) => {
          res.json({ day: upDay, hours: req.body.hoursLimit });
        });
      });
    });
  }
);

//Private Route
//Manager Edit timeStart, timeEnd manually
router.post(
  "/manager_edit_jobday_hours",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get Selected
    console.log(" req.body manager_edit_jobday_hours", req.body);
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
      const filteredDay = days.find((day) => {
        return day.employee == req.body.selectedDay.employee;
      });
      console.log("filteredDay", filteredDay);
      if (req.body.selectedDay.timeStart) {
        //Create timeStart date format
        const timeStartSubstr = req.body.selectedDay.timeStart.substring(0, 11);
        const newTimeStartStr = timeStartSubstr + req.body.timeStart + ":00";
        filteredDay.timeStart = new Date(newTimeStartStr);
      }
      //If We Edit Jobday with existing timeStart and timeEnd
      if (req.body.selectedDay.timeEnd) {
        //Create timeStart date format
        const timeEndSubstr = req.body.selectedDay.timeEnd.substring(0, 11);
        const newTimeEndStr = timeEndSubstr + req.body.timeEnd + ":00";
        filteredDay.timeEnd = new Date(newTimeEndStr);
      }
      //No timeEnd yet exists , so we create one
      //We use timeStart date plus timeEnd time

      if (req.body.timeEnd) {
        const timeStartSubstr = req.body.selectedDay.timeStart.substring(0, 11);
        const newTimeStartStr = timeStartSubstr + req.body.timeEnd + ":00";
        filteredDay.timeEnd = new Date(newTimeStartStr);
      }

      if (req.body.managerComment.length > 0) {
        console.log("req.body.managerComment", req.body.managerComment);
        filteredDay.managerNote = req.body.managerComment;
      }

      filteredDay.save().then(() => {
        res.json({ status: true });
      });
    });
  }
);
//Private Route
//Manager Creates the Jobday  manually
router.post(
  "/manager_create_jobday",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.timeStart) {
      //Pre validation when user picked date on calendar
      console.log(" req.body manager_edit_jobday_hours validation", req.body);
      let dateFilter = {
        $lt: new Date(req.body.date.date + "T23:59:59"),
        $gt: new Date(req.body.date.date + "T00:00:00"),
      };
      JobDay.find({ date: dateFilter }).then((days) => {
        if (days.length > 0) {
          console.log("days", days);
          // check if found day related to current employee
          const employeeDay = days.find((day) => {
            return day.employee.toString() === req.body.employeeID;
          });
          if (employeeDay) {
            return res.status(400).json({ errorDate: "Date already exists" });
          } else {
            return res.json({ message: "Date valid" });
          }
        } else {
          return res.json({ message: "Date valid" });
        }
      });
    } else {
      //Creating New Date
      const timeStartFormat = `${req.body.date.date}T${req.body.timeStart}:00`;
      const timeEndFormat = `${req.body.date.date}T${req.body.timeEnd}:00`;

      console.log(" req.body manager_edit_jobday_hours create", req.body);
      new JobDay({
        employee: req.body.employeeID,
        projectID: req.body.projectID,
        managerID: req.body.managerID,
        timeStart: new Date(timeStartFormat),
        timeEnd: new Date(timeEndFormat),
        date: new Date(req.body.date.date),
        confirmManager: true,
        confirmEmployee: true,
        startedByManager: true,
        managerNote: req.body.text,
      })
        .save()
        .then(() => {
          res.json({ message: "Date was created" });
        })
        .then((err) => {
          res.status(400).json(err);
        });
    }
  }
);

//Delete Jobday
//Private Route
router.post(
  "/delete_jobday",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    JobDay.findById(req.body.id)
      .then((day) => {
        if (!day) {
          return res.json({ message: "No Jobday found" });
        }
        day.remove().then(() => {
          res.json({ message: "Jobday was deleted" });
        });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
);

module.exports = router;
