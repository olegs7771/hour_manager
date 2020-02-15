const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  projectID: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  started: {
    type: String,
    require: true
  },
  func: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  confirmed: {
    type: Boolean
  }
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
