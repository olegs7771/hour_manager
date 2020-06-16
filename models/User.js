const mongoose = require("mongoose");

//Create Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  secretQuestion1: {
    type: String,
  },
  secretAnswer1: {
    type: String,
  },
  secretQuestion2: {
    type: String,
  },
  secretAnswer2: {
    type: String,
  },

  password: {
    type: String,
  },
  location: {
    type: String,
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
  approvedByAdmin: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  projects: [
    {
      _id: {
        type: String,
      },
      projectName: {
        type: String,
      },
      companyName: {
        type: String,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now(),
  },

  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "12h" },
  },
  // expireAt: false,
});

module.exports = User = mongoose.model("User", UserSchema);
