const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  companyName: {
    type: String
  },
  projectName: {
    type: String
  },
  location: {
    type: String
  },
  companyCoreFunc: {
    type: String
  },
  workDayHours: {
    start: {
      type: String
    },
    end: {
      type: String
    }
  },

  //List of Employees
  staff: [
    {
      employeeID: {
        type: String
      },
      companyName: {
        type: String
      },
      projectName: {
        type: String
      },
      employeeName: {
        type: String
      },
      employeeEmail: {
        type: String
      },
      employeePhone: {
        type: String
      },
      func: {
        type: String
      },
      started: {
        type: String
      },
      address: {
        type: String
      },
      confirmed: {
        type: Boolean
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
