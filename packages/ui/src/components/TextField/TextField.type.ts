import { FakeButtonProps } from "components/FakeButton";

export type TextFieldProps = {
  className?: string;
  error?: string;
  name?: string;
  inputRef?: React.Ref<HTMLInputElement | null | undefined>;
  label?: string;
  onBlur?: (event: React.ChangeEvent) => any;
  onChange?: (event: React.ChangeEvent) => any;
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
  value?: string;
};
