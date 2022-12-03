import { classNames } from "@identity-service/core";
import React, { ReactElement, ReactNode, memo } from "react";

import { ButtonColors, ButtonProps, ButtonVariants } from "components/Button";

import css from "./ButtonGroup.module.scss";
import { ButtonGroupProps } from "./ButtonGroup.type";

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

const ButtonGroup = ({
  className,
  children,
  color = "primary",
  variant = "contained",
}: ButtonGroupProps) => {
  const classes = [
    css.ButtonGroup,
    className,
    getButtonVariant(variant),
    getButtonColor(color),
  ];

  const childrenWithProps = React.Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const buttonClassNames = classNames(child.props.className, css.button);

      const clone = React.cloneElement<ButtonProps>(child as ReactElement, {
        className: buttonClassNames,
        variant: "contained",
        color: "primary",
      });

      return clone;
    },
  );

  return (
    <div className={classNames(...classes)} data-testid="ButtonGroup">
      {childrenWithProps}
    </div>
  );
};

export { ButtonGroup };

export default memo(ButtonGroup);
