import { ObjectSchema } from "yup";
import * as yup from "yup";

import { ResetPasswordCommand } from "api/types";
import { passwordValidation } from "utils/validationSchemas/validationObjects";

const passwordResetSchema: ObjectSchema<ResetPasswordCommand> = yup
  .object()
  .shape({
    password: passwordValidation,
    confirmPassword: yup
      .string()
      .required("confirm is a required field")
      .oneOf([yup.ref("password")], "passwords should match"),
    token: yup.string().required(),
    userId: yup.string().required(),
  });

export { passwordResetSchema };
