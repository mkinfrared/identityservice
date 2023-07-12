import { ObjectSchema } from "yup";
import * as yup from "yup";

import { ConfirmEmailFormData } from "components/ConfirmEmailForm/ConfirmEmailForm.type";

const confirmEmailSchema: ObjectSchema<ConfirmEmailFormData> = yup
  .object()
  .shape({
    code: yup.string().required(),
  });

export { confirmEmailSchema };
