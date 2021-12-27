type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAttributes & {
  children?: React.ReactNode;
  className?: string;
  variant?: "opaque" | "transparent";
};
