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
  console.log("req.body checkIn_automatic", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }

    //validation passed!
    //Check if JobDay was alredy Created
    //Create date parameter for dateFilter( 2020-04-10)
    const dateParam = moment(req.body.timeStart).format("YYYY-MM-DD");
    console.log("dateParam", dateParam);

    //validation passed!

    //Find jobday for particular date
    const dateFilter = {
      $lt: new Date(dateParam + "T23:59:59"),
      $gt: new Date(dateParam + "T00:00:00"),
    };

    JobDay.find({ employee: req.body.id })
      .then((days) => {
        console.log("days.length", days.length);

        if (days.length === 0) {
          //No job days for this employee been found at all! .Create new one by checkIn Button
          new JobDay({
            employee: req.body.id,
            projectID: req.body.projectID,
            timeStart: req.body.timeStart,
            date: new Date(moment().format()),
          })
            .save()
            .then((jobday) => {
              res.json(jobday);
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        } else {
          console.log("found jobdays for current employee");
          //Check if Employee has jobday for current day

          const selectedDay = days.find((day) => {
            console.log("day", day);
            return (
              moment(day.date).format("L") === moment(req.body.id).format("L")
            );
          });
          console.log("found day", selectedDay);

          if (selectedDay) {
            return res.json({
              selectedDay,
              message: "this date  already exists",
            });
          } else {
            new JobDay({
              employee: req.body.id,
              projectID: req.body.projectID,
              timeStart: req.body.timeStart,
              date: new Date(moment().format()),
            })
              .save()
              .then((jobday) => {
                res.json(jobday);
              })
              .catch((err) => {
                res.status(400).json({ error: err });
              });
          }
        }
      })
      .catch((err) => {
        console.log("error to filter date", err);
      });

    console.log("Authorized");
  });
});

//Create Jobday CheckOut Automatic(by start&end buttons)
//After checkOut calculate total time spend on job
router.post("/checkOut_automatic", (req, res) => {
  console.log("req.body checkOut_automatic", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }

    //Create date parameter for dateFilter( 2020-04-10)
    const dateParam = moment(req.body.timeEnd).format("YYYY-MM-DD");

    //validation passed!
    // res.json({ message: "Success!" });
    //Find jobday for particular date
    const dateFilter = {
      $lt: new Date(dateParam + "T23:59:59"),
      $gt: new Date(dateParam + "T00:00:00"),
    };

    JobDay.find({ date: dateFilter })
      .then((days) => {
        //Employee can not End jobday without Start day
        // Promps to edit manually in Log
        if (!days) return res.json({ message: "No jobday" });
        //Filter found days by Employee Id

        const selectedDay = days.find((day) => {
          return day.employee == req.body.id;
        });
        console.log("selectedDay", selectedDay);

        // console.log("total time ", totalTime);

        selectedDay.timeEnd = req.body.timeEnd;
        // selectedDay.totalTimeOnJob = totalTime;
        selectedDay.save().then((upDay) => {
          //Found day to make automatic checkOut and calculate total time spend on job

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

//Manually Set timeStart By Employee
//Protected Route
router.post("/startTime_manually", (req, res) => {
  console.log("req.body in starttime manually", req.body);

  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }

    //Find if Jobday Exists
    //Create dateFilter

    const dateFilter = {
      $lt: new Date(req.body.date + "T23:59:59"),
      $gt: new Date(req.body.date + "T00:00:00"),
    };
    JobDay.find({ date: dateFilter }).then((days) => {
      if (days.length === 0) {
        //No days found create one
        console.log("no days been found");
        const dateFormat = new Date(
          req.body.date + `T${req.body.timeStart}` + ":00"
        );

        new JobDay({
          employee: req.body.id,
          projectID: req.body.projectID,
          timeStart: dateFormat,
          messages: { text: req.body.message },
          timeStartMan: moment().format(), //Current Date
          date: dateFormat, //Selected day
        })
          .save()
          .then((day) => {
            console.log("created new Jobday", day);

            if (!day) return res.json({ message: "Day was not created" });
            res.json({
              message: "Start time has been succefully set up",
              dateFormat: dateFormat,
            });
          });
      } else {
        //Days found for this date. Filter by Employee Id
        const filtredDays = days.filter((day) => {
          return day.employee == req.body.id;
        });
        console.log("filtredDays", filtredDays);

        if (filtredDays.length === 0) {
          //Day not found for this date and employee id
          //create new Jobday
          console.log("no day found create one");
          //create isoDate
          const dateFormat = new Date(
            req.body.date + `T${req.body.timeStart}` + ":00"
          );

          new JobDay({
            employee: req.body.id,
            projectID: req.body.projectID,
            timeStart: dateFormat,
            messages: { text: req.body.message },
            timeStartMan: moment().format(), //Current Date
            date: dateFormat,
          }).save(() => {
            return res.json({
              message: "Start time has been succefully set up",
            });
          });
        } else {
          //day been found for this date and employee id
          //update jobday with timeStart(time Employee had added manually)
          //update timeStartMan (actual time )
          //create isoDate
          const dateFormat = new Date(
            req.body.date + `T${req.body.timeStart}` + ":00"
          );

          filtredDays.map((day) => {
            console.log("day", day);
            day.timeStartMan = moment().format(); //current time
            day.timeStart = dateFormat;
            //overwrite if there is previous message
            day.message = req.body.message;
            day.save().then((upDate) => {
              console.log("upDate", upDate);
              res.json({
                message: "Start time has been succefully changed!",
                dateFormat,
              });
            });
          });
        }
      }
    });
  });
});
//Manually Set timeEnd By Employee
//Protected Route

router.post("/endTime_manually", (req, res) => {
  console.log("req.body in endtime manually", req.body);

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
      console.log("days", days);

      if (days.length === 0) {
        //No days found create one
        console.log("no days been found");
        const dateFormat = new Date(
          req.body.date + `T${req.body.timeEnd}` + ":00"
        );
        new JobDay({
          employee: req.body.id,
          projectID: req.body.projectID,
          timeEnd: dateFormat,
          messages: { text: req.body.message },
          timeEndMan: moment().format(), //Current Date
          date: dateFormat,
        }).save(() => {
          return res.json({ message: "End time has been succefully set up" });
        });
      } else {
        //Days found for this date. filter by Employee Id
        const filtredDays = days.filter((day) => {
          return day.employee == req.body.id;
        });
        console.log("filtredDays", filtredDays);

        if (filtredDays.length === 0) {
          //day not found for this date and employee id
          //create new Jobday
          console.log("no day found create one");
          new JobDay({
            employee: req.body.id,
            projectID: req.body.projectID,
            timeEnd: dateFormat,
            message: { text: req.body.message },
            timeEndMan: moment().format(), //Current Date
            date: dateFormat,
          }).save(() => {
            return res.json({ message: "End time has been succefully set up" });
          });
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
            day.timeEndMan = moment().format(); //current time
            day.timeEnd = dateFormat;
            day.messages.unshift({ text: req.body.message });
            day.save().then((upDate) => {
              console.log("upDate", upDate);
              res.json({ message: "End time has been succefully set up" });
            });
          });
        }
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
  });
});

//Get Project for Coords
router.post("/getProject", (req, res) => {
  console.log("req.body getProject", req.body);

  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }
    Project.findById(req.body.projectID).then((project) => {
      if (!project) {
        return res.status(400).json({ error: "No project found" });
      }

      res.json(project);
    });
  });
});

module.exports = router;
