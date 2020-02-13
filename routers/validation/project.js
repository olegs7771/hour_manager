const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateProjectInput = data => {
  let errors = {};
  //companyName Field
  if (!validator.isLength(data.companyName, { min: 2, max: 12 })) {
    errors.companyName = "Name must contain between 2 and 12 characters";
  }
  //location Field
  if (!validator.isLength(data.location, { min: 2, max: 12 })) {
    errors.location = "Location must contain between 2 and 12 characters";
  }

  //check for empty  company fields
  if (validator.isEmpty(data.companyName)) {
    errors.companyName = "Company name can not be empty";
  }
  //check for empty location fields
  if (validator.isEmpty(data.location)) {
    errors.location = "Location can not be empty";
  }
  //check for empty companyCoreFunc fields
  if (validator.isEmpty(data.companyCoreFunc)) {
    errors.companyCoreFunc =
      "Choose the type of company's core  business  function";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProjectInput;
