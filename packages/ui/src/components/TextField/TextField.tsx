import { classNames, mergeRefs } from "@identity-service/core";
import React, { memo, useCallback, useRef } from "react";

import FakeButton from "components/FakeButton";
import Heading from "components/Heading";
import Text from "components/Text";

import css from "./TextField.module.scss";
import { TextFieldProps } from "./TextField.type";

const TextField = ({
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
  value
}: TextFieldProps) => {
  const classes = [
    css.TextField,
    className,
    !!error && css.hasError,
    !!prefix && css.hasPrefix,
    !!suffix && css.hasSuffix
  ];

  const ref = useRef<HTMLInputElement | null>(null);
  const mergedRefs = mergeRefs(inputRef, ref);

  const handleHeadingClick = useCallback(() => {
    const { current } = ref;

    current?.focus();
  }, []);

  const handleLabelClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <label
      className={classNames(...classes)}
      onClick={handleLabelClick}
      data-testid="TextField"
    >
      {label && (
        <Heading
          variant="h5"
          className={css.label}
          onClick={handleHeadingClick}
        >
          {label}
        </Heading>
      )}
      <div className={css.input}>
        <input
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          ref={mergedRefs}
          value={value}
        />
        <FakeButton className={css.prefix}>{prefix}</FakeButton>
        <FakeButton className={css.suffix} onClick={onSuffixClick}>
          {suffix}
        </FakeButton>
      </div>
      <Text className={css.error}>{error}</Text>
    </label>
  );
};

export { TextField };

export default memo(TextField);
