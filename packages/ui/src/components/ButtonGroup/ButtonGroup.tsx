import { classNames } from "@identity-service/core";
import React, { ReactNode, memo } from "react";

import { ButtonProps } from "components/Button";

import css from "./ButtonGroup.module.scss";
import { ButtonGroupProps } from "./ButtonGroup.type";

const ButtonGroup = ({ className, children }: ButtonGroupProps) => {
  const childrenWithProps = React.Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const classes = classNames(child.props.className, css.button);

      const clone = React.cloneElement<ButtonProps>(child, {
        className: classes,
      });

      return clone;
    },
  );

  return (
    <div
      className={classNames(css.ButtonGroup, className)}
      data-testid="ButtonGroup"
    >
      {childrenWithProps}
    </div>
  );
};

export { ButtonGroup };

export default memo(ButtonGroup);
