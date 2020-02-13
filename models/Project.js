const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  managerName: {
    type: String
  },
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
