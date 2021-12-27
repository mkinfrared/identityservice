import { SpinnerProps } from "components/Spinner";

export type LoadingProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  container: React.RefObject<HTMLElement>;
  type?: SpinnerProps["type"];
};
