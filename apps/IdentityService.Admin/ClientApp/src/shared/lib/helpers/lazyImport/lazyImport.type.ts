import { ComponentType } from "react";

export type LazyFunction<T extends ComponentType<any>> = () => Promise<
  | T
  | {
      default: T;
    }
>;
