type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAttributes & {
  children?: React.ReactNode;
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

export type ButtonColors = "primary" | "secondary" | "success" | "error";

export type ButtonVariants = "contained" | "outlined";
