/* eslint-disable react/button-has-type */
import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import { ButtonColors, ButtonVariants } from "components/Button";
import Spinner from "components/Spinner";

import css from "./IconButton.module.scss";
import { IconButtonProps } from "./IconButton.type";

const colors: Record<ButtonColors, string> = {
  primary: css.primary,
  secondary: css.secondary,
  success: css.success,
  error: css.error,
};

const variants: Record<ButtonVariants, string> = {
  contained: css.contained,
  outlined: css.outlined,
};

const getButtonColor = (color: ButtonColors) => colors[color];
const getButtonVariant = (variant: ButtonVariants) => variants[variant];

const IconButton = ({
  children,
  className,
  color = "primary",
  disabled = false,
  loading = false,
  type = "button",
  variant = "contained",
  ...rest
}: IconButtonProps) => {
  const classes = [
    css.Button,
    className,
    getButtonVariant(variant),
    getButtonColor(color),
  ];

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
