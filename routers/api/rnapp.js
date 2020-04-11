const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const JobDay = require("../../models/Jobday");
const Project = require("../../models/Project");
const moment = require("moment");

//Route Private
//Fetch All JobDays of selected Employee ID
router.post("/fetch_jobdays", (req, res) => {
  console.log("req.body", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }

    JobDay.find({ employee: req.body.id }).then((days) => {
      if (!days) {
        return console.log("no days");
      }
      res.json(days);
    });
  });
});

//Create Jobday CheckIn Automatic(by start&end buttons)
router.post("/checkIn_automatic", (req, res) => {
  console.log("req.body", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }
    //validation passed!
    //Check if JobDay was alredy Created
    //Create date parameter for dateFilter( 2020-04-10)
    const dateParam = moment(req.body.timeStart).format("YYYY-MM-D");

    //validation passed!

    //Find jobday for particular date
    const dateFilter = {
      $lt: new Date(dateParam + "T23:59:59"),
      $gt: new Date(dateParam + "T00:00:00"),
    };
    JobDay.find({ date: dateFilter }).then((days) => {
      if (days.length === 0) {
        //No job days today yet .Create new one by checkIn Button
        new JobDay({
          employee: req.body.id,
          timeStart: req.body.timeStart,
        })
          .save()
          .then((jobday) => {
            res.json(jobday);
          })
          .catch((err) => {
            res.status(400).json({ error: "Error to create" });
          });
      } else {
        console.log("day already created");

        const selectedDay = days.find((day) => {
          console.log("day", day);
          return day.employee == req.body.id;
        });
        res.json({ selectedDay, message: "sselected day" });
      }
    });

    console.log("Authorized");
  });
});
//Create Jobday CheckOut Automatic(by start&end buttons)
router.post("/checkOut_automatic", (req, res) => {
  console.log("req.body", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }

    //Create date parameter for dateFilter( 2020-04-10)
    const dateParam = moment(req.body.timeStart).format("YYYY-MM-D");

    //validation passed!
    // res.json({ message: "Success!" });
    //Find jobday for particular date
    const dateFilter = {
      $lt: new Date(dateParam + "T23:59:59"),
      $gt: new Date(dateParam + "T00:00:00"),
    };

    JobDay.find({ date: dateFilter })
      .then((days) => {
        if (!days) return res.json({ message: "No jobday" });
        //Filter found days by Employee Id

        const selectedDay = days.find((day) => {
          console.log("day", day);
          return day.employee == req.body.id;
        });
        selectedDay.timeEnd = req.body.timeEnd;
        selectedDay.save().then((upDay) => {
          res.json(upDay);
        });
      })
      .catch((err) => {
        console.log("error to filter days", err);
      });
  });
});

//Get Todays CheckIn checkOut Time if day exists
//For showing in JobdayScreen
router.post("/get_today_time", (req, res) => {
  console.log("req.body", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }
    //Validation Passed
    //Find all jobdays for today

    const dateFilter = {
      $lt: new Date(req.body.date + "T23:59:59"),
      $gt: new Date(req.body.date + "T00:00:00"),
    };
    JobDay.find({ date: dateFilter })
      .then((days) => {
        if (!days) return res.json({ message: "No jobday" });
        //Filter found days by Employee Id

        const selectedDay = days.find((day) => {
          console.log("day", day);
          return day.employee == req.body.id;
        });
        res.json(selectedDay);
      })
      .catch((err) => {
        console.log("error to filter days", err);
      });

    console.log("Authorized");
  });
});

module.exports = router;
