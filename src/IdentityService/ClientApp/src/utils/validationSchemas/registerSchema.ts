import * as yup from "yup";

const passwordRegex = {
  upperCase: new RegExp("[A-Z]"),
  lowerCase: new RegExp("[a-z]"),
  number: new RegExp("[0-9]"),
  special: new RegExp("[#?!@$%^&*-]"),
};

const passwordValidation = yup
  .string()
  .required()
  .min(6)
  .matches(
    passwordRegex.upperCase,
    "password must contain at least one upper case letter",
  )
  .matches(
    passwordRegex.lowerCase,
    "password must contain at least one lower case letter",
  )
  .matches(passwordRegex.number, "password must contain at least one number")
  .matches(
    passwordRegex.special,
    "password must contain at least one special character",
  );

const registerSchema = yup.object().shape({
  username: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  phoneNumber: yup.string().required(),
  password: passwordValidation,
  passwordConfirmation: yup
    .string()
    .required("confirm is a required field")
    .oneOf([yup.ref("password")], "passwords should match"),
});

export { registerSchema };
