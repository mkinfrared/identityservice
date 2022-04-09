import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import { ButtonColors, ButtonVariants } from "components/Button";

import css from "./LinkButton.module.scss";
import { LinkButtonProps } from "./LinkButton.type";

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

const LinkButton = ({
  className,
  color = "primary",
  children,
  variant = "contained",
  ...rest
}: LinkButtonProps) => {
  const classes = [
    css.LinkButton,
    className,
    getButtonVariant(variant),
    getButtonColor(color),
  ];

  return (
    <a className={classNames(...classes)} data-testid="LinkButton" {...rest}>
      {children}
    </a>
  );
};

export { LinkButton };

export default memo(LinkButton);
