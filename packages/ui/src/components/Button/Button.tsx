/* eslint-disable react/button-has-type */
import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import css from "./Button.module.scss";
import { ButtonProps } from "./Button.type";

const Button = ({
  children,
  className,
  type = "button",
  variant = "opaque",
  ...rest
}: ButtonProps) => {
  const classes = [css.Button, className];

  switch (variant) {
    case "transparent":
      classes.push(css.transparent);

      break;

    default:
      classes.push(css.opaque);
  }

  return (
    <button
      className={classNames(...classes)}
      data-testid="Button"
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export { Button };

export default memo(Button);
