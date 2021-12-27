import React from "react";

export type PortalProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  children?: React.ReactNode;
  container: React.RefObject<HTMLElement>;
  replaceHtml?: boolean;
};
