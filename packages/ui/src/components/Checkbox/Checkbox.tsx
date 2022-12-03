import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import Text from "components/Text";

import { ReactComponent as Tick } from "../../icons/tick.svg";

import css from "./Checkbox.module.scss";
import { CheckboxProps } from "./Checkbox.type";

/**
 * Renders an html checkbox
 */
const Checkbox = ({
  className,
  checked,
  defaultChecked,
  disabled = false,
  error = false,
  inputRef,
  label,
  name,
  onChange,
  readOnly = false,
  value,
}: CheckboxProps) => {
  const mergedRefs = mergeRefs(inputRef);

  return (
    <label
      className={classNames(
        css.Checkbox,
        error && css.error,
        readOnly && css.readOnly,
        className,
      )}
      data-testid="Checkbox"
    >
      <input
        className={classNames(css.input)}
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
        <div className={css.checkmark}>
          <Tick className={css.tick} />
        </div>
        {label && <Text className={css.text}>{label}</Text>}
      </div>
    </label>
  );
};

export { Checkbox };

export default memo(Checkbox);
