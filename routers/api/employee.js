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
        if (!project) {
          return res.status(200).json({ message: "project not exists" });
        }
        console.log("project found");
        //Find Employee
        Employee.findOne({ email: req.body.email })
          .then(employee => {
            const {
              projectID,
              name,
              email,
              phone,
              address,
              started,
              func
            } = req.body;

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
                phone,
                started,
                func,
                confirmed: false
              })
                .save()
                .then(newEmployee => {
                  console.log("newEmployee", newEmployee);
                  //Create url for new Employee activation
                  const URL = `http://localhost:5000/api/employee/activate?id=${newEmployee._id}&projectID=${newEmployee.projectID}&email=${newEmployee.email}`;
                  console.log("project", project);

                  //Send Email To Newly Created Employee
                  const data = {
                    type: "NEW_EMPLOYEE_ADDED",
                    projectID: newEmployee.projectID,
                    employeeID: newEmployee._id,
                    employeeName: newEmployee.name,
                    employeeEmail: newEmployee.email,
                    employeePhone: newEmployee.phone,
                    func: newEmployee.func,
                    started: newEmployee.started,
                    employeeDate: newEmployee.date,
                    companyName: project.companyName,
                    projectName: project.projectName,
                    url: URL
                  };
                  sendMail(data, cb => {
                    if (cb.infoMessageid) {
                      res.status(200).json({
                        message:
                          "The new Employee was added to your project. Message was send to new Employee's Email "
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
                        employeePhone: newEmployee.phone,
                        companyName: project.companyName,
                        projectName: project.projectName,
                        confirmed: false,
                        started: newEmployee.started,
                        address: newEmployee.address,
                        func: newEmployee.func
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
    console.log("req.body.id", req.body.id);

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
                message: ` An Employee ${removed.name} which was registered by  email :${removed.email} was successfully deleted.`
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
  // //Confirm Employee =>  update employee.confirmed=true;
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
      //     //Update in Project.staff[] employee confirmed:true
      Project.findById(projectID).then(project => {
        //       //Find eployee in project.staff[]
        const employeeToUpdate = project.staff.find(item => {
          return item.employeeEmail === upEmployee.email;
        });
        //       console.log("employeeToUpdate", employeeToUpdate);
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

          //Send Email to New Employee
          const data = {
            type: "ACTIVATION",
            name: employeeToUpdate.employeeName,
            email: employeeToUpdate.employeeEmail,
            companyName: employeeToUpdate.companyName,
            projectID: upEmployee.projectID,
            id: upEmployee._id,
            code: "some code"
          };
          sendMail(data, cb => {
            if (cb.infoMessageid) {
              console.log(
                "New Employee received instruction after activation thier account"
              );
            }
          });
        });
      });
    });
  });
});

//Get Selected Employee
//Private Route
router.post(
  "/get_employee",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    console.log("req.body.id", req.body.id);
    Employee.findById(req.body.id).then(employee => {
      if (!employee) {
        return res.status(400).json({ error: "Employee not found" });
      }

      res.json(employee);
    });
  }
);

//Update Employee Details
//Private Route

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req.body", req.body);

    const { errors, isValid } = validateEmployeeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Passed Validation
    Employee.findOneAndUpdate(
      { _id: req.body.id },
      {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        started: req.body.started,
        name: req.body.name
      },
      { new: true }
    ).then(employee => {
      if (!employee) {
        console.log("not found");
        return res.status(400).json({ error: "User not found" });
      }

      res.json({ message: "Employee was updated" });
    });
  }
);

module.exports = router;
