const validator = require("validator");
const isEmpty = require("./isEmpty");

const validateProjectInput = (data) => {
  let errors = {};
  //companyName Field
  if (!validator.isLength(data.companyName, { min: 2, max: 25 })) {
    errors.companyName = "Name must contain between 2 and 12 characters";
  }
  //companyName Field
  if (!validator.isLength(data.projectName, { min: 2, max: 12 })) {
    errors.projectName =
      "Project name must contain between 2 and 12 characters";
  }
  //location Field
  if (!validator.isLength(data.location, { min: 2, max: 12 })) {
    errors.location = "Location must contain between 2 and 12 characters";
  }

  //check for empty  company fields
  if (isEmpty(data.companyName)) {
    errors.companyName = "Company name can not be empty";
  }
  //check for empty  Project Name fields
  if (isEmpty(data.projectName)) {
    errors.projectName = "Project name can not be empty";
  }
  //check for empty location fields
  if (isEmpty(data.location)) {
    errors.location = "Location can not be empty";
  }
  //check for empty companyCoreFunc fields
  if (isEmpty(data.companyCoreFunc)) {
    errors.companyCoreFunc =
      "Choose the type of company's core  business  function";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateProjectInput;
