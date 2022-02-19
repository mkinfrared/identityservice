import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import Text from "components/Text";

import css from "./Toggle.module.scss";
import { ToggleProps } from "./Toggle.type";

/**
 * renders a an iOS like toggle
 */
const Toggle = ({
  className,
  name,
  label,
  error,
  onChange,
  inputRef,
  checked,
}: ToggleProps) => {
  const mergedRefs = mergeRefs(inputRef);

  return (
    <label
      className={classNames(css.Toggle, error && css.error, className)}
      data-testid="Toggle"
    >
      <input
        type="checkbox"
        className={css.input}
        ref={mergedRefs}
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <div className={css.container}>
        <span className={css.ball} />
      </div>
      {label && <Text className={css.text}>{label}</Text>}
    </label>
  );
};

export { Toggle };

export default memo(Toggle);
