import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import css from "./LinkButton.module.scss";
import { LinkButtonProps } from "./LinkButton.type";

const LinkButton = ({
  className,
  children,
  variant,
  ...rest
}: LinkButtonProps) => {
  const classes = [css.LinkButton, className];

  switch (variant) {
    case "transparent":
      classes.push(css.transparent);

      break;

    default:
      classes.push(css.opaque);
  }

  return (
    <a className={classNames(...classes)} data-testid="LinkButton" {...rest}>
      {children}
    </a>
  );
};

export { LinkButton };

export default memo(LinkButton);
