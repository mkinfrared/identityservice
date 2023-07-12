import { ComponentType } from "react";

export type HocProvider = (Cmp: ComponentType) => ComponentType;
