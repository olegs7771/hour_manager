const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  started: {
    type: String
  },
  function: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
