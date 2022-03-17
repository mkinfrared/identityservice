import { CheckboxProps } from "@identity-service/ui";

export type CheckboxFieldProps = Omit<CheckboxProps, "inputRef"> & {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};
