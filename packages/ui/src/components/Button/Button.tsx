/* eslint-disable react/button-has-type */
import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import Spinner from "components/Spinner";

import css from "./Button.module.scss";
import { ButtonProps } from "./Button.type";

const Button = ({
  children,
  className,
  loading = false,
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

  if (loading) {
    classes.push(css.loading);
  }

  return (
    <button
      className={classNames(...classes)}
      data-testid="Button"
      type={type}
      {...rest}
    >
      <Spinner type="bars" />
      {children}
    </button>
  );
};

export { Button };

export default memo(Button);
