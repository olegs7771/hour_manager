const express = require("express");
const router = express.Router();
//Models
const Employee = require("../../models/Employee");
const Project = require("../../models/Project");
//JWT
const jwt = require("jsonwebtoken");
const keys = require("../../config/dev_keys").secredOrKey;
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
      .then((project) => {
        if (!project) {
          return res.status(200).json({ message: "project not exists" });
        }
        console.log("project found");
        //Find Employee
        Employee.findOne({ email: req.body.email })
          .then((employee) => {
            const {
              projectID,
              name,
              email,
              phone,
              address,
              started,
              func,
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
                confirmed: false,
                code: 0,
                token: "",
              })
                .save()
                .then((newEmployee) => {
                  console.log("newEmployee", newEmployee);
                  //Create url for new Employee activation
                  let URL;
                  if (process.env.NODE_ENV === "production") {
                    URL = `https://glacial-crag-30370.herokuapp.com/activate/${newEmployee._id}/${newEmployee.projectID}`;
                  } else {
                    URL = `http://localhost:3000/activate/${newEmployee._id}/${newEmployee.projectID}`;
                  }

                  //Send Email To Newly Created Employee
                  console.log("URL", URL);
                  const data = {
                    type: "NEW_EMPLOYEE_ADDED",
                    projectID: newEmployee.projectID,
                    employeeID: newEmployee._id,
                    employeeName: newEmployee.name,
                    email: newEmployee.email,
                    employeePhone: newEmployee.phone,
                    func: newEmployee.func,
                    started: newEmployee.started,
                    employeeDate: newEmployee.date,
                    companyName: project.companyName,
                    projectName: project.projectName,
                    url: URL,
                  };

                  sendMail(data, (cb) => {
                    if (!cb.infoMessageid) {
                      return res
                        .status(400)
                        .json({ error: "Can't send Email" });
                    }

                    res.json({
                      message:
                        "The new Employee was added to your project. Message was send to new Employee's Email ",
                    });
                    //Update Project.stafF[]
                    Project.findById(projectID).then((project) => {
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
                          func: newEmployee.func,
                        });
                        project.save().then((upProject) => {
                          console.log("upProject", upProject);
                        });
                      }
                    });
                  });
                });
            }
          })
          .catch((err) => {
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
      .then((employee) => {
        if (!employee) {
          return res.status(400).json({ error: "No Employee with such ID" });
        }
        console.log("employee", employee);
        employee.remove().then((removed) => {
          console.log("removed", removed);
          //Remove removed employee from project.staff[]
          Project.findById(removed.projectID).then((project) => {
            console.log("project", project);
            const upStaff = project.staff.filter((item) => {
              return item.employeeEmail !== removed.email;
            });
            project.staff = upStaff;
            project.save().then((upProject) => {
              res.status(200).json({
                message: ` An Employee ${removed.name} which was registered by  email :${removed.email} was successfully deleted.`,
              });
            });
          });
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
);

//Activation of New Employee from Mail Link with Params
router.post("/activate", async (req, res) => {
  console.log("req.body", req.body);

  //   // // // //Confirm Employee =>  update employee.confirmed=true,code:random number
  const employee = await Employee.findById(req.body.uid);
  if (!employee) {
    res
      .status(400)
      .json({ error: "No such employee. Please contact administrator" });
  }
  // //Create random code
  const ranNum = Math.random() * 10000000;
  employee.code = Math.trunc(ranNum);
  employee.confirmed = true;
  employee.save().then((upEmployee) => {
    console.log("upEmployee", upEmployee);
    //Send Email to New Employee
    const data = {
      type: "ACTIVATION",
      name: upEmployee.name,
      email: upEmployee.email,
      code: upEmployee.code,
    };
    sendMail(data, (cb) => {
      if (cb.infoMessageid) {
        console.log(
          "New Employee received instruction after activation his/her account"
        );
        //Send Email to Notify Manager of the Current Project
      }
    });
  });

  //     //Update in Project.staff[] employee confirmed:true
  const project = await Project.findById(req.body.projectID);

  if (!project) {
    return res.status(400).json({ error: "Can not find project" });
  }
  //       //Find eployee in project.staff[]
  const employeeToUpdate = project.staff.find((item) => {
    return item.employeeEmail === upEmployee.email;
  });
  //       console.log("employeeToUpdate", employeeToUpdate);
  if (employeeToUpdate.confirmed === true) {
    return res
      .status(400)
      .json({ error: "This Account Already been Activated" });
  }
  //Update Activated Employee
  employeeToUpdate.confirmed = true;
  project.save().then((upProject) => {
    //Notify Employee that Accout been Activated!
    res.json({
      message: `Dear ${employeeToUpdate.employeeName} your account for HourManager App was successfully activated! You will recieve further instructions to your e-mail. See you soon..`,
    });
  });
});

//Get Selected Employee
//Private Route
router.post(
  "/get_employee",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    // console.log("req.body.id", req.body.id);
    Employee.findById(req.body.id).then((employee) => {
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
        name: req.body.name,
      },
      { new: true }
    ).then((upEmployee) => {
      if (!upEmployee) {
        console.log("not found");
        return res.status(400).json({ error: "User not found" });
      }

      // res.json({ message: "Employee was updated" });
      console.log("upEmployee", upEmployee);

      //Update Project.stafF[]
      Project.findById(req.body.projectID).then((project) => {
        if (!project) {
          return console.log("no project");
        }
        console.log("project", project);

        project.staff.map((employee, index) => {
          if (employee.id === upEmployee.id) {
            // console.log("employee match", employee);
            // console.log("index", index);

            const updatedEmployee = {
              _id: req.body.id,
              projectID: req.body.projectID,
              employeeName: req.body.name,
              employeeEmail: req.body.email,
              employeePhone: req.body.phone,
              companyName: employee.companyName,
              projectName: employee.projectName,
              confirmed: employee.confirmed,
              address: req.body.address,
              func: req.body.func,
              started: req.body.started,
            };

            const newArr = Object.assign([], project.staff, {
              [index]: updatedEmployee,
            });
            project.staff = newArr;
          }
        });

        project.save().then((upProject) => {
          res.json({ message: "Employee was updated" });
        });
      });
    });
  }
);

//Login Route from Mobile App by Employee
//req.body (email,code)
//returns token
router.post("/employee_login", (req, res) => {
  Employee.findOne({ email: req.body.email }).then((employee) => {
    if (!employee)
      return res
        .status(400)
        .json({ error: "Employee not exists. Please check Email " });
    //Employee Found
    console.log("employee", employee);

    if (employee.code !== parseInt(req.body.code))
      return res.status(400).json({ error: "Wrong code. Please try again" });
    //Code valid.Create Token For Logged Employee App
    const payload = {
      name: employee.name,
      email: employee.email,
      address: employee.address,
      phone: employee.phone,
      started: employee.started,
      func: employee.func,
      projectID: employee.projectID,
    };
    jwt.sign(payload, keys, (err, token) => {
      if (err) {
        throw err;
      }
      employee.token = token;
      employee.save().then(() => {
        console.log("token set");
        res.json({
          token,
          name: employee.name,
          email: employee.email,
          uid: employee._id,
          projectID: employee.projectID,
        });
      });
    });
  });
});

// Test ejs response
router.get("/ejs", (req, res) => {
  console.log("query", req.query);
  const uid = req.query.uid;
  res.render("employeeActivation.ejs", {
    data: {
      employeeName: "John",
      uid,
    },
  });
});

module.exports = router;
