/// <reference types="react-scripts" />

declare type BadRequest<T extends Record<string, unknown>> = Record<
  keyof T,
  string[]
>;
