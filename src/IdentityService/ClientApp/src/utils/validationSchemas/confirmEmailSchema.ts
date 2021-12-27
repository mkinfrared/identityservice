import { SchemaOf } from "yup";
import * as yup from "yup";

import { ConfirmEmailFormData } from "components/ConfirmEmailForm/ConfirmEmailForm.type";

const confirmEmailSchema: SchemaOf<ConfirmEmailFormData> = yup.object().shape({
  code: yup.string().required(),
});

export { confirmEmailSchema };
