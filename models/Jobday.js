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
  timeStartMan: {
    type: Date,
  },
  timeEnd: {
    type: Date,
  },
  timeEndMan: {
    type: Date,
  },
  //In Case Employee Manually edit CheckIn or CheckOut
  //must add reason message and submit
  //Menager after Receiving Message confirm too
  confirmEmployee: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
  },
  confirmManager: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = JobDay = mongoose.model("JobDay", JobDaySchema);
