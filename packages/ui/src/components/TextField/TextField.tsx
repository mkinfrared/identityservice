import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo } from "react";

import FakeButton from "components/FakeButton";
import Heading from "components/Heading";
import Text from "components/Text";

import css from "./TextField.module.scss";
import { TextFieldProps } from "./TextField.type";

const TextField = ({
  autoComplete,
  className,
  error,
  inputRef,
  name,
  label,
  type = "text",
  onBlur,
  onChange,
  onSuffixClick,
  prefix,
  suffix,
  value,
}: TextFieldProps) => {
  const classes = [
    css.TextField,
    className,
    !!error && css.hasError,
    !!prefix && css.hasPrefix,
    !!suffix && css.hasSuffix,
  ];

  const mergedRefs = mergeRefs(inputRef);

  return (
    <label className={classNames(...classes)} data-testid="TextField">
      {label && (
        <Heading variant="h5" className={css.label}>
          {label}
        </Heading>
      )}
      <div className={css.input}>
        {prefix && <FakeButton className={css.prefix}>{prefix}</FakeButton>}
        <input
          autoComplete={autoComplete}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={mergedRefs}
          type={type}
          value={value}
        />
        {suffix && (
          <FakeButton className={css.suffix} onClick={onSuffixClick}>
            {suffix}
          </FakeButton>
        )}
      </div>
      <Text className={css.error}>{error}</Text>
    </label>
  );
};

export { TextField };

export default memo(TextField);
