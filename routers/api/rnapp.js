const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const JobDay = require("../../models/Jobday");
const Project = require("../../models/Project");

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

//Create Jobday Automatic(by start&end buttons)
router.post("/create_jobday_automatic", (req, res) => {
  console.log("req.body", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }
    //validation passed!

    // const newJobday = new JobDay({
    //   employee:req.body.id,
    //   timeStart:req.body

    // })
    console.log("Authorized");
  });
});

module.exports = router;
