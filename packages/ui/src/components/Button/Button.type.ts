type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAttributes & {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  variant?: "opaque" | "transparent";
};
