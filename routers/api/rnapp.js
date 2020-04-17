const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const JobDay = require("../../models/Jobday");
const Project = require("../../models/Project");
const moment = require("moment");

//Route Private
//Fetch All JobDays of selected Employee ID
router.post("/fetch_jobdays", (req, res) => {
  // console.log("req.body", req.body);
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
  // console.log("req.body", req.body);
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
  // console.log("req.body", req.body);
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

//Manually Set timeEnd By Employee
router.post("/endTime_manually", (req, res) => {
  console.log("req.body", req.body);

  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }
    console.log("Authorized!");

    //Find if Jobday Exists
    //Create dateFilter

    const dateFilter = {
      $lt: new Date(req.body.date + "T23:59:59"),
      $gt: new Date(req.body.date + "T00:00:00"),
    };
    JobDay.find({ date: dateFilter }).then((days) => {
      if (!days) {
        //No days found create one
        console.log("no days been found");
      }
      //Days found for this date. filter by Employee Id
      const filtredDays = days.filter((day) => {
        return day.employee == req.body.id;
      });
      console.log("filtredDays", filtredDays);

      if (filtredDays.length === 0) {
        //day not found for this date and employee id
        //create new Jobday
        console.log("no day found create one");
      } else {
        //day been found for this date and employee id
        //update jobday with timeEnd(actual time)
        //update timeEndMan (employee added manually)
        //create isoDate
        const dateFormat = new Date(
          req.body.date + `T${req.body.timeEnd}` + ":00"
        );
        console.log("dateFormat", dateFormat);

        filtredDays.map((day) => {
          console.log("day", day);
          day.timeEndMan = moment().format();
          day.timeEnd = dateFormat; //current time
          day.save().then((upDate) => {
            console.log("upDate", upDate);
          });
        });
      }
    });
  });
});

//Employee Confirmed Jobday Hours Pair
router.post("/confirmEmployee", (req, res) => {
  console.log("req.body confirm", req.body);

  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }

    //Find all jobdays
    //Create dateFilter
    const dateFilter = {
      $lt: new Date(req.body.date + "T23:59:59"),
      $gt: new Date(req.body.date + "T00:00:00"),
    };

    JobDay.find({ date: dateFilter }).then((days) => {
      //Filter jobdays for current Employee
      const filteredDay = days.filter((day) => {
        return day.employee !== req.body.id;
      });
      //update found jobday confirmEmployee=true
      console.log("filteredDay", filteredDay);
      filteredDay.map((day) => {
        //if already confirmed employee can cancel confirmation
        if (day.confirmEmployee === true) {
          day.confirmEmployee = false;
          day.save().then((upDayjob) => {
            console.log("upDayjob", upDayjob);
            res.json({ message: "Confirmation was canceled" });
          });
        } else {
          day.confirmEmployee = true;
          day.save().then((upDayjob) => {
            console.log("upDayjob", upDayjob);
            res.json({ message: "Date was confirmed" });
          });
        }
      });
    });

    //Find if Employee has a day that he want to confirm
  });
});

module.exports = router;
