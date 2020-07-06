const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  projectID: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  managerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  managerName: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  started: {
    type: String,
    require: true,
  },
  func: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: Boolean,
  },
  code: {
    type: Number,
  },
  token: {
    type: String,
  },
});

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
