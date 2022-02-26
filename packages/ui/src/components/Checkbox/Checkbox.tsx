import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import Text from "components/Text";
import { ReactComponent as Tick } from "icons/tick.svg";

import css from "./Checkbox.module.scss";
import { CheckboxProps } from "./Checkbox.type";

/**
 * Renders an html checkbox
 */
const Checkbox = ({
  className,
  checked,
  error = false,
  inputRef,
  label,
  name,
  onChange,
  value,
}: CheckboxProps) => {
  const mergedRefs = mergeRefs(inputRef);

  return (
    <label
      className={classNames(css.Checkbox, error && css.error, className)}
      data-testid="Checkbox"
    >
      <input
        className={css.input}
        checked={checked}
        name={name}
        onChange={onChange}
        ref={mergedRefs}
        type="checkbox"
        value={value}
      />
      <div className={css.checkmark}>
        <Tick className={css.tick} />
      </div>
      {label && <Text className={css.text}>{label}</Text>}
    </label>
  );
};

export { Checkbox };

export default memo(Checkbox);
