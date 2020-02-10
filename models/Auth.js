const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const AuthSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },

  password: {
    type: String
  },

  confirmed: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Auth = mongoose.model("auth", AuthSchema);
