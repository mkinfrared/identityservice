import { SchemaOf } from "yup";
import * as yup from "yup";

import { RegisterCommand } from "api/types";

import { passwordValidation } from "../validationObjects";

const registerSchema: SchemaOf<RegisterCommand> = yup.object().shape({
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
  redirectUrl: yup.string().required(),
});

export { registerSchema };
