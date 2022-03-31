import { ButtonProps } from "components/Button";

type AnchorAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkButtonProps = AnchorAttributes &
  Pick<ButtonProps, "variant"> & {
    /**
     * a string that will be applied as a css class to parent element
     */
    className?: string;
  };
