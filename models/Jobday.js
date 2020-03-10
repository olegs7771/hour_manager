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
  }
});

module.exports = JobDay = mongoose.model("JobDay", JobDaySchema);
