import React, { memo } from "react";
import { classNames } from "@identity-service/core";

import css from "./Text.module.scss";
import { TextProps } from "./Text.type";

const Text = ({ children, className }: TextProps) => (
  <p className={classNames(css.Text, className)} data-testid="Text">
    {children}
  </p>
);

export { Text };

export default memo(Text);
