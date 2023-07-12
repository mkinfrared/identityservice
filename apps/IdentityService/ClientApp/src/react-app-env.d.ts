/// <reference types="react-scripts" />

declare type BadRequest<T extends Record<string, unknown>> = Record<
  keyof T,
  string[]
>;

declare type SvgComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;
