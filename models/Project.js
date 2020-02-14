const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: "users" },
  companyName: {
    type: String
  },
  location: {
    type: String
  },
  companyCoreFunc: {
    type: String
  },

  //List of Employees
  staff: [
    {
      employeeId: {
        type: String
      },
      employeeName: {
        type: String
      },
      function: {
        type: String
      },
      startDate: {
        type: String
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("project", ProjectSchema);
