const express = require("express");
const router = express.Router();
//Models
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");
const passport = require("passport");
const validateEmployeeInput = require("../validation/employee");
const sendMail = require("../../utils/mail/MailTransporter");

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
                  console.log("newEmployee", newEmployee);
                  //Create url for new Employee activation
                  const URL = `http://localhost:5000/api/employee/activate?id=${newEmployee._id}&projectID=${newEmployee.projectID}&email=${newEmployee.email}`;

                  //Send Email To Newly Created Employee
                  const data = {
                    type: "NEW_EMPLOYEE_ADDED",
                    projectID: newEmployee.projectID,
                    companyName: project.companyName,
                    projectName: project.projectName,
                    employeeID: newEmployee._id,
                    employeeName: newEmployee.name,
                    employeeEmail: newEmployee.email,
                    employeeFunc: newEmployee.func,
                    employeeStartedJob: newEmployee.started,
                    employeeDate: newEmployee.date,
                    url: URL
                  };
                  sendMail(data, cb => {
                    if (cb.infoMessageid) {
                      res.status(200).json({
                        message: "The Message was send to new Employee's Email "
                      });
                    }
                  });

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
                        console.log("upProject", upProject);
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

//Activation of New Employee from Mail Link
router.get("/activate", (req, res) => {
  const employeeID = req.query["id"];
  const employeeEmail = req.query["email"];
  const projectID = req.query["projectID"];
  //Confirm Employee =>  update employee.confirmed=true;
  Employee.findById(employeeID).then(employee => {
    console.log("employee", employee);
    if (!employee) {
      res
        .status(400)
        .json({ message: "No such employee. Please contact administrator" });
    }
    employee.confirmed = true;
    employee.save().then(upEmployee => {
      console.log("upEmployee", upEmployee);
      //Update in Project.staff[] employee confirmed:true
      Project.findById(projectID).then(project => {
        //Find eployee in project.staff[]
        const employeeToUpdate = project.staff.find(item => {
          return item.employeeEmail === upEmployee.email;
        });
        console.log("employeeToUpdate", employeeToUpdate);
        if (employeeToUpdate.confirmed === true) {
          return res.status(200).json({
            message: `The user ${employeeToUpdate.employeeName} already has been activated`
          });
        }
        employeeToUpdate.confirmed = true;
        project.save().then(upProject => {
          res.render("employeeActivation.ejs", {
            data: {
              employeeName: employeeToUpdate.employeeName,
              employeeEmail: employeeToUpdate.employeeEmail,
              companyName: employeeToUpdate.companyName,
              projectName: employeeToUpdate.projectName
            }
          });
        });
        //Send New Employee Email with a Link to download HourManager App
        //Data with creds for Regestring In App
        

        }
      });
    });
  });
});

router.get("/test", (req, res) => {
  res.render("employeeActivation.ejs");
});

module.exports = router;
