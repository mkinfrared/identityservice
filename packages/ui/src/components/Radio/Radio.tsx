import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import Text from "components/Text";

import css from "./Radio.module.scss";
import { RadioProps } from "./Radio.type";

const Radio = ({
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
}: RadioProps) => {
  const refs = mergeRefs(inputRef);

  return (
    <label
      className={classNames(
        css.Radio,
        error && css.error,
        readOnly && css.readOnly,
        className,
      )}
      data-testid="Radio"
    >
      <input
        className={css.input}
        disabled={disabled}
        defaultChecked={defaultChecked}
        ref={refs}
        name={name}
        checked={checked}
        onChange={onChange}
        readOnly={readOnly}
        type="radio"
        value={value}
      />
      <div className={css.circle} />
      {label && <Text className={css.text}>{label}</Text>}
    </label>
  );
};

export { Radio };

export default memo(Radio);
