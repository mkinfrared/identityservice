import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAttributes & {
  children?: ReactNode;
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  color?: ButtonColors;
  /*
    renders a spinner instead of children
   */
  loading?: boolean;
  /*
    variant to use
   */
  variant?: ButtonVariants;
};

export type ButtonColors = "error" | "primary" | "secondary" | "success";

export type ButtonVariants = "contained" | "outlined";
