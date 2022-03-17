import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import Text from "components/Text";

import css from "./Toggle.module.scss";
import { ToggleProps } from "./Toggle.type";

/**
 * renders a an iOS like toggle
 */
const Toggle = ({
  checked,
  className,
  defaultChecked,
  disabled = false,
  error,
  inputRef,
  label,
  name,
  onChange,
  readOnly = false,
}: ToggleProps) => {
  const mergedRefs = mergeRefs(inputRef);

  return (
    <label
      className={classNames(
        css.Toggle,
        error && css.error,
        readOnly && css.readOnly,
        className,
      )}
      data-testid="Toggle"
    >
      <input
        checked={checked}
        className={css.input}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        ref={mergedRefs}
        onChange={onChange}
        readOnly={readOnly}
        type="checkbox"
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
