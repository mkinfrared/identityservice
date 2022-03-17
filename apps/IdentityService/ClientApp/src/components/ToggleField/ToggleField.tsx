import { Toggle } from "@identity-service/ui";
import { Ref, forwardRef, memo } from "react";

import { ToggleFieldProps } from "./ToggleField.type";

const ToggleField = forwardRef(
  (props: ToggleFieldProps, ref: Ref<HTMLInputElement>) => (
    <Toggle {...props} inputRef={ref} />
  ),
);

ToggleField.displayName = "ToggleField";

export { ToggleField };

export default memo(ToggleField);
