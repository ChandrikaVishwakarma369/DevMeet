const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong....Try again!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoURL",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditFields.includes(field);
  });

  return isEditAllowed;
};

const validateNewPassword = (req) => {
  const allowedEditPassword = ["emailId", "password"]
   const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditPassword.includes(field);
  });

  return isEditAllowed;

}
module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateNewPassword
};
