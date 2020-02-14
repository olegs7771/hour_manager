const mongoose = require("mongoose");

//Create Schema

const UserSchema = new mongoose.Schema({
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
  token: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("User", UserSchema);