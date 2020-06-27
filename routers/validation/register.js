const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (data) => {
  console.log("data in validation", data);

  let errors = {};
  //Name Field
  if (!validator.isLength(data.name.trim(), { min: 2, max: 30 })) {
    errors.name = "Name must contain between 2 and 30 characters";
  }
  //Email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong E-mail format";
  }
  //Phone
  if (!validator.isMobilePhone("+" + data.phone)) {
    errors.phone = "Phone number wrong format.";
  }
  if (data.password) {
    if (data.password.length > 10 || data.password.length < 6) {
      errors.password = "Password must contain min 6 and max 10 chars";
    }
  }

  //check for empty fields
  if (validator.isEmpty(data.name)) {
    errors.name = "Name can not be empty";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email address can not be empty";
  }
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone number can not be empty";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "Location can not be empty";
  }
  if (data.password) {
    if (validator.isEmpty(data.password)) {
      errors.location = "Password can not be empty";
    }
  }

  if (data.secretAnswer1) {
    if (validator.isEmpty(data.secretAnswer1)) {
      errors.secretAnswer1 = "Can not be empty";
    }
  }
  if (data.secretAnswer2) {
    if (validator.isEmpty(data.secretAnswer2)) {
      errors.secretAnswer2 = " Can not be empty";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
