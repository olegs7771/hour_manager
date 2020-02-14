const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateEmployeeInput = data => {
  let errors = {};
  //companyName Field
  if (!validator.isLength(data.name, { min: 2, max: 12 })) {
    errors.name = "Name must contain between 2 and 12 characters";
  }
  //email Field
  if (!validator.isEmail(data.email)) {
    errors.email = "Wrong Email Format";
  }
  //function Field
  if (!validator.isLength(data.function)) {
    errors.function =
      "Employee function must contain between 2 and 12 characters";
  }
  //started Field
  const reg = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!reg.test(data.started)) {
    errors.started = "Please use dd/mm/yyyy format for example 01/05/2014";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEmployeeInput;
