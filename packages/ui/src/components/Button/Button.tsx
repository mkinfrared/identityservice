import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import css from "./Button.module.scss";
import { ButtonProps } from "./Button.type";

const Button = ({
  children,
  className,
  disabled = false,
  variant = "opaque"
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
      disabled={disabled}
      data-testid="Button"
    >
      {children}
    </button>
  );
};

export { Button };

export default memo(Button);
