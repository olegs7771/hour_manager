const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const JobDay = require("../../models/Jobday");
const Project = require("../../models/Project");

//Test
router.post("/test", (req, res) => {
  console.log("req.body", req.body);
  Employee.findOne({ token: req.body.token }).then((emp) => {
    if (!emp) {
      return res.status(400).json({ error: "Unauthorized!" });
    }
    //validation passed!
    //Create dateFilter  $gt 01-12-2020T00:00:01 $lt 31-12-2020T23:59:59

    const dateFilter = {
      $gt: new Date(req.body.date.startDay),
      $lt: new Date(req.body.date.endDay),
    };
    JobDay.find({ date: dateFilter }).then((days) => {
      if (!days) {
        return console.log("no days");
      }
      console.log("days", days);
    });
  });
});

module.exports = router;
