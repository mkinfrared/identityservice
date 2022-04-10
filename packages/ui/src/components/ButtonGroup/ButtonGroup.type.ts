import { ReactNode } from "react";

import { ButtonProps } from "components/Button";

export type ButtonGroupProps = Pick<ButtonProps, "color" | "variant"> & {
  children?: ReactNode;
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};
