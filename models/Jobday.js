const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobDaySchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee"
  },

  timeStart: {
    type: Number
  },
  timeEnd: {
    type: Number
  },
  weekday: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = JobDay = mongoose.model("JobDay", JobDaySchema);
