import * as yup from "yup";

import * as rules from "./regexpRules";

const passwordValidation = yup
  .string()
  .required()
  .min(6)
  .matches(
    rules.password.upperCase,
    "password must contain at least one upper case letter",
  )
  .matches(
    rules.password.lowerCase,
    "password must contain at least one lower case letter",
  )
  .matches(rules.password.number, "password must contain at least one number")
  .matches(
    rules.password.special,
    "password must contain at least one special character",
  );

export { passwordValidation };
