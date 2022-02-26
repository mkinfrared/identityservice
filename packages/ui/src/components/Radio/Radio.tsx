import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import Text from "components/Text";

import css from "./Radio.module.scss";
import { RadioProps } from "./Radio.type";

const Radio = ({
  className,
  name,
  label,
  error,
  inputRef,
  checked,
  onChange,
  value,
}: RadioProps) => {
  const refs = mergeRefs(inputRef);

  return (
    <label
      className={classNames(css.Radio, error && css.error, className)}
      data-testid="Radio"
    >
      <input
        className={css.input}
        ref={refs}
        name={name}
        checked={checked}
        onChange={onChange}
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
