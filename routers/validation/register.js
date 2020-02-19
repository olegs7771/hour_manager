const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = data => {
  console.log("data in validation", data);

  let errors = {};
  //Name Field
  if (!validator.isLength(data.name, { min: 2, max: 12 })) {
    errors.name = "Name must contain between 2 and 12 characters";
  }
  //Email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong email format";
  }
  //Phone
  if (!validator.isMobilePhone(data.phone, ["he-IL"])) {
    errors.phone = "phone wrong format.";
  }
  // Password
  if (!validator.isAlphanumeric(data.password.toUpperCase())) {
    errors.password = "Password must contain numbers and letters";
  }

  //check for empty fields
  if (validator.isEmpty(data.name)) {
    errors.name = "Name can not be empty";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone can not be empty";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password can not be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
