const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateLoginInput = data => {
  let errors = {};

  //Email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong email format";
  }

  // Password
  if (!validator.isAlphanumeric(data.password.toUpperCase())) {
    errors.password = "Password must contain numbers and letters";
  }

  //check for empty fields

  if (validator.isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password can not be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
