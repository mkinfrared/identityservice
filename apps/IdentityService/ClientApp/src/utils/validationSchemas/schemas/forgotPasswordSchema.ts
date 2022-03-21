import { SchemaOf } from "yup";
import * as yup from "yup";

import { ForgotPasswordDto } from "api/types";

const forgotPasswordSchema: SchemaOf<ForgotPasswordDto> = yup.object().shape({
  email: yup.string().required().email(),
  returnUrl: yup.string().required(),
});

export { forgotPasswordSchema };
