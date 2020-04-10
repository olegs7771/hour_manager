const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobDaySchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },

  timeStart: {
    type: Date,
  },
  timeEnd: {
    type: Date,
  },
  //In Case Employee Manually edit CheckIn or CheckOut
  //must add reason message and submit
  //Menager after Receiving Message confirm too
  submitted: {
    type: Boolean,
  },
  message: {
    type: String,
  },
  managerConfirmed: {
    type: Boolean,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = JobDay = mongoose.model("JobDay", JobDaySchema);
