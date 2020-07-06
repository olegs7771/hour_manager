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
const UpCase = require("../../utils/helpFunctions/UpperCase");

//Create New Employee
//Private Route
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmployeeInput(req.body);
    console.log("(req.body", req.body);

    if (!isValid) return res.status(400).json(errors);
    //Passed Validation
    //Find Project
    Project.findOne({ _id: req.body.projectID })
      .then((project) => {
        if (!project) {
          return res.status(200).json({ message: "project not exists" });
        }
        console.log("project found staff", project.staff);
        //Check if staff array  has  object with  employeeEmail=req.body.email
        const isFound = project.staff.find((emp) => {
          return emp.employeeEmail === req.body.email;
        });
        console.log("isFound", isFound);
        if (isFound) {
          return res.status(400).json({
            error:
              "The Employee with such E-Mail already exists in this project!",
          });
        }
        console.log("No such Email!");

        const {
          projectID,
          managerID,
          managerName,
          name,
          email,
          phone,
          address,
          started,
          func,
        } = req.body;
        new Employee({
          projectID,
          managerID,
          managerName,
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
            console.log("newEmployee");
            //           //Create url for new Employee activation
            let URL;
            if (process.env.NODE_ENV === "production") {
              URL = `https://glacial-crag-30370.herokuapp.com/activate/${newEmployee._id}/${newEmployee.projectID}`;
            } else {
              URL = `http://localhost:3000/activate/${newEmployee._id}/${newEmployee.projectID}`;
            }
            //             //Update Project.stafF[]
            Project.findById(newEmployee.projectID)
              .then((project) => {
                if (project) {
                  project.staff.unshift({
                    _id: newEmployee._id,
                    employeeName: newEmployee.name,
                    employeeEmail: newEmployee.email,
                    employeePhone: newEmployee.phone,
                    companyName: project.companyName,
                    projectName: project.projectName,
                    // confirmed: false,
                    // app: false,
                    started: newEmployee.started,
                    address: newEmployee.address,
                    func: newEmployee.func,
                  });
                  project
                    .save()
                    .then((upProject) => {
                      console.log("upProject inserted into staff arr");
                      //           //Send Email To Newly Created Employee
                      //           console.log("URL", URL);
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
                      });
                    })
                    .catch((err) => {
                      console.log("error to save upProject", err);
                    });
                }
              })
              .catch((error) => {
                console.log("error to find project", error);
              });
          });
      })
      .catch((err) => {
        console.log("err :", err);

        return res.status(400).json({ error: "Error occured to find project" });
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
                message: ` An Employee ${removed.name} which was registered by  email [${removed.email}] was successfully deleted.`,
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
  const randomNum = Math.trunc(Math.random() * 10000000);

  //   // // // //Confirm Employee =>  update employee.confirmed=true,code:random number
  const filter = { _id: req.body.uid };
  const update = { confirmed: true, code: randomNum };
  const upEmployee = await Employee.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log("upEmployee", upEmployee);

  //     //Update in Project.staff[] employee confirmed:true
  Project.findById(req.body.projectID).then((project) => {
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
    employeeToUpdate.code = randomNum;
    project.save().then((upProject) => {
      //Notify Employee that Accout been Activated!
      res.json({
        message: `Dear ${UpCase(
          employeeToUpdate.employeeName
        )} your account for HourManager App was successfully activated! Please remember
        app code [${upEmployee.code}],project code [${
          upProject.projectCode
        }]  and E-mail [${
          upEmployee.email
        }]. You will need it for SignIn in HourManager App.
        Please check email 
        `,
        employee: {
          name: employeeToUpdate.employeeName,
          code: upEmployee.code, //for Login in App
          email: upEmployee.email, //for Login in App
          projectID: upEmployee.projectID,
          projectCode: upProject.projectCode, //for Login in App
        },
      });
    });
  });
});

//After Activation Send Notification to Employee with Code and Email
router.post("/sendEmail", (req, res) => {
  console.log("req.body sendEmail", req.body);
  //Send Email to New upEmployee
  const data = {
    type: "ACTIVATION",
    name: req.body.name,
    email: req.body.email,
    code: req.body.code,
    projectCode: req.body.projectCode,
  };
  sendMail(data, (cb) => {
    if (!cb.infoMessageid) {
      return res.status(400).json({ error: "Can't send Email" });
    }
    console.log(
      "New Employee received instruction after activation his/her account"
    );
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
  //Look up current Project for all
  console.log("req.body.employee_login", req.body);
  Project.findOne({ projectCode: parseInt(req.body.projectCode) }).then(
    (project) => {
      if (!project) {
        return res.status(400).json({ projectCode: "Wrong Project Code" });
      }
      // console.log("project found", project);

      //Project Found
      const employeeFound = project.staff.find((emp) => {
        console.log("emp", emp.code);
        return emp.code.toString() === req.body.appCode;
      });
      console.log("employeeFound", employeeFound);

      if (!employeeFound) {
        return res.status(400).json({ appCode: "Wrong App Code" });
      }
      //Employee Found
      if (employeeFound.employeeEmail !== req.body.email) {
        return res.status(400).json({
          email: "Employee not exists or been removed. Please check Email",
        });
      }
      console.log("employeeFound", employeeFound);
      //Create Payload and Token
      const payload = {
        name: employeeFound.employeeName,
        email: employeeFound.employeeEmail,
        address: employeeFound.address,
        phone: employeeFound.employeePhone,
        started: employeeFound.started,
        func: employeeFound.func,
        projectID: project._id,
      };
      console.log("payload", payload);

      jwt.sign(payload, keys, (err, token) => {
        console.log("token", token);

        if (err) {
          throw err;
        }
        employeeFound.app = true;
        project.save().then(() => {
          console.log("token set");

          res.json({
            token,
            name: employeeFound.employeeName,
            email: employeeFound.employeeEmail,
            uid: employeeFound._id,
            projectID: project._id,
          });
          //Update Employee Model
          Employee.findById(employeeFound._id).then((employee) => {
            if (!employee) {
              return console.log("can not find an employee");
            }
            employee.token = token;
            employee.save();
          });
        });
      });
    }
  );
});

module.exports = router;
