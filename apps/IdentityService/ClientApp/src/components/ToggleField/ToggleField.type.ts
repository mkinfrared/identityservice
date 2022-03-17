import { ToggleProps } from "@identity-service/ui";

export type ToggleFieldProps = Omit<ToggleProps, "inputRef"> & {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};
