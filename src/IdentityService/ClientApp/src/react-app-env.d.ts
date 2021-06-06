/// <reference types="react-scripts" />

declare type BadRequest<T extends Record<string, any>> = Record<
  keyof T,
  string[]
>;
