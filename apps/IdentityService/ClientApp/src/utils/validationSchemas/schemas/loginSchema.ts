import { ObjectSchema } from "yup";
import * as yup from "yup";

import { LoginCommand } from "api/types";

const loginSchema: ObjectSchema<LoginCommand> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  returnUrl: yup.string().required(),
});

export { loginSchema };
