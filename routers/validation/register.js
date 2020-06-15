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
    errors.email = "Wrong email format";
  }
  //Phone
  if (!validator.isMobilePhone("+" + data.phone)) {
    errors.phone = "phone wrong format.";
  }

  if (data.password.length > 10 || data.password.length < 6) {
    errors.password = "Password must contain min 6 and max 10 chars";
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
  if (validator.isEmpty(data.location)) {
    errors.location = "Location can not be empty";
  }
  if (validator.isEmpty(data.location)) {
    errors.location = "Location can not be empty";
  }
  if (validator.isEmpty(data.secretQuestion)) {
    errors.secretQuestion = "Secret question can not be empty";
  }
  if (validator.isEmpty(data.secretAnswer)) {
    errors.secretAnswer = "Secret answer can not be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
