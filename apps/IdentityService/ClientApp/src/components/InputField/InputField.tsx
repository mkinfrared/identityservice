import { TextField } from "@identity-service/ui";
import { Ref, forwardRef, memo } from "react";

import { InputFieldProps } from "./InputField.type";

const InputField = forwardRef(
  ({ className, ...rest }: InputFieldProps, ref: Ref<HTMLInputElement>) => (
    <TextField {...rest} className={className} inputRef={ref} />
  ),
);

InputField.displayName = "InputField";

export { InputField };

export default memo(InputField);
