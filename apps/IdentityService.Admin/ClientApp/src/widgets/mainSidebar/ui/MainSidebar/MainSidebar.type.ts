import { ReactNode } from "react";

export type MainSidebarProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
};

export type LinkItem = {
  text: string;
  path: string;
  icon: ReactNode;
};
