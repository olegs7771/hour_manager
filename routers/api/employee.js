const express = require("express");
const router = express.Router();
//Models
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");
const passport = require("passport");
const validateEmployeeInput = require("../validation/employee");

//Create New Employee
//Private Route
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmployeeInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    //Passed Validation
    //Find Project
    Project.findById(req.body.projectID)
      .then(project => {
        console.log("project found");
        //Find Employee
        Employee.findOne({ email: req.body.email })
          .then(employee => {
            const { projectID, name, email, address, started, func } = req.body;

            if (employee) {
              return res
                .status(400)
                .json({ error: "Employee with such email exists." });
            } else {
              console.log("employee not found");
              //Create new Employee
              new Employee({
                projectID,
                name,
                email,
                address,
                started,
                func,
                confirmed: false
              })
                .save()
                .then(newEmployee => {
                  //Send Email To Newly Created Employee

                  console.log("newEmployee", newEmployee);
                  //Update Project.stafF[]
                  Project.findById(projectID).then(project => {
                    if (project) {
                      project.staff.unshift({
                        _id: newEmployee._id,
                        employeeName: newEmployee.name,
                        employeeEmail: newEmployee.email,
                        companyName: project.companyName,
                        projectName: project.projectName,
                        confirmed: false
                      });
                      project.save().then(upProject => {
                        res.status(200).json(upProject.staff);
                      });
                    }
                  });
                });
            }
          })
          .catch(err => {
            return console.log("employee not found", err);
          });
      })
      .catch(() => {
        return res
          .status(400)
          .json({ error: "Can not find Project with given ID" });
      });
  }
);
//Delete Employee by ID
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Employee.findById(req.body.id)
      .then(employee => {
        if (!employee) {
          return res.status(400).json({ error: "No Employee with such ID" });
        }
        console.log("employee", employee);
        employee.remove().then(removed => {
          console.log("removed", removed);
          //Remove removed employee from project.staff[]
          Project.findById(removed.projectID).then(project => {
            console.log("project", project);
            const upStaff = project.staff.filter(item => {
              return item.employeeEmail !== removed.email;
            });
            project.staff = upStaff;
            project.save().then(upProject => {
              res.status(200).json({
                message: `User ${removed.name} which was registered by  email :${removed.email} was successfully deleted.`
              });
            });
          });
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
);

module.exports = router;
