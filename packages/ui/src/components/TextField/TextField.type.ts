import { FakeButtonProps } from "components/FakeButton";

type InputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix"
>;

export type TextFieldProps = InputAttributes & {
  autoComplete?: string;
  className?: string;
  error?: string;
  name?: string;
  inputRef?: React.Ref<HTMLInputElement | null | undefined>;
  label?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSuffixClick?: FakeButtonProps["onClick"];
  prefix?: React.ReactElement<SVGSVGElement>;
  suffix?: React.ReactElement<SVGSVGElement>;
  type?:
    | "email"
    | "file"
    | "hidden"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url";
};
