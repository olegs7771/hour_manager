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
  location: {
    type: String
  },
  companyCoreFunc: {
    type: String
  },

  //List of Employees
  staff: [{ type: Schema.Types.ObjectId, ref: "Employee" }],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
