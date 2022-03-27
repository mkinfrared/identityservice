/* eslint-disable react/button-has-type */
import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import Spinner from "components/Spinner";

import css from "./IconButton.module.scss";
import { IconButtonProps } from "./IconButton.type";

const IconButton = ({
  children,
  className,
  disabled = false,
  loading = false,
  type = "button",
  variant = "opaque",
  ...rest
}: IconButtonProps) => {
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
      className={classNames(css.IconButton, ...classes)}
      disabled={disabled}
      data-testid="IconButton"
      type={type}
      {...rest}
    >
      <Spinner className={css.spinner} type="oval" />
      {children}
    </button>
  );
};

export { IconButton };

export default memo(IconButton);
