import { classNames } from "@identity-service/core";
import React, { KeyboardEventHandler, memo } from "react";

import css from "./FakeButton.module.scss";
import { FakeButtonProps } from "./FakeButton.type";

const FakeButton = ({ className, children, onClick }: FakeButtonProps) => {
  const handleKeyPress: KeyboardEventHandler = (event) => {
    const { key } = event;

    if (key === "Enter" || key === " ") {
      const { target } = event;
      const ev = new MouseEvent("click", { bubbles: true });

      target.dispatchEvent(ev);
    }
  };

  return (
    <div
      className={classNames(css.FakeButton, className)}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      data-testid="FakeButton"
    >
      {children}
    </div>
  );
};

export { FakeButton };

export default memo(FakeButton);
