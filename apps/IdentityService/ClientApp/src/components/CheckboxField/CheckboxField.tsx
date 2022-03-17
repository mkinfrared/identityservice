import { Checkbox } from "@identity-service/ui";
import { Ref, forwardRef, memo } from "react";

import { CheckboxFieldProps } from "./CheckboxField.type";

const CheckboxField = forwardRef(
  (props: CheckboxFieldProps, ref: Ref<HTMLInputElement>) => (
    <Checkbox {...props} inputRef={ref} />
  ),
);

CheckboxField.displayName = "Checkbox";

export { CheckboxField };

export default memo(CheckboxField);
