import { TextFieldProps } from "@identity-service/ui";

export type InputFieldProps = Omit<TextFieldProps, "inputRef"> & {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};
