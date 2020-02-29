const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateEmployeeInput = data => {
  let errors = {};

  // //Name Field
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must contain between 2 and 30 characters";
  }
  // //email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong Email Format";
  }
  // //function Field
  if (!validator.isLength(data.func)) {
    errors.func = "Employee function must contain between 2 and 12 characters";
  }
  //started Field
  const reg = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!reg.test(data.started)) {
    errors.started = "Please use dd/mm/yyyy format for example 01/05/2014";
  }

  //Empty fields
  if (isEmpty(data.name)) {
    errors.name = "Name can not be empty";
  }
  if (isEmpty(data.email)) {
    errors.email = "Email can not be empty";
  }
  if (isEmpty(data.address)) {
    errors.address = "Address can not be empty";
  }
  if (isEmpty(data.func)) {
    errors.func = "Function can not be empty";
  }
  if (isEmpty(data.started)) {
    errors.started = "Start date can not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEmployeeInput;
