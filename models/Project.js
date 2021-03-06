const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  companyName: {
    type: String,
  },
  projectName: {
    type: String,
  },
  location: {
    type: String,
  },
  companyCoreFunc: {
    type: String,
  },
  workDayHours: {
    start: {
      type: String,
    },
    end: {
      type: String,
    },
  },
  //Coorditates and Address of choosen place
  coords: {
    type: Object,
  },
  address: {
    type: String,
  },
  plus_code: {
    type: String,
  },
  //For Employee Login. To look up project for existing Employees
  //Code created at the project creation and never changed
  projectCode: {
    type: Number,
  },

  //List of Employees
  staff: [
    {
      employeeID: {
        type: String,
      },
      companyName: {
        type: String,
      },
      projectName: {
        type: String,
      },
      employeeName: {
        type: String,
      },
      employeeEmail: {
        type: String,
      },
      employeePhone: {
        type: String,
      },
      code: {
        type: Number,
      },
      func: {
        type: String,
      },
      started: {
        type: String,
      },
      address: {
        type: String,
      },
      confirmed: {
        type: Boolean,
        default: false,
      },
      app: {
        type: Boolean, // Employee was prompted to download app and logged in by using provided Email and Code
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
