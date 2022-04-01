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
  value,
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
        className={css.input}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        onChange={onChange}
        ref={mergedRefs}
        readOnly={readOnly}
        type="checkbox"
        value={value}
      />
      <div className={css.container}>
        <div className={css.switch}>
          <span className={css.ball} />
        </div>
        {label && <Text className={css.text}>{label}</Text>}
      </div>
    </label>
  );
};

export { Toggle };

export default memo(Toggle);
