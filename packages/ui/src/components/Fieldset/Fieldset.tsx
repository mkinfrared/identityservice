import { classNames } from "@identity-service/core";
import React, { memo } from "react";

import css from "./Fieldset.module.scss";
import { FieldsetProps } from "./Fieldset.type";

const Fieldset = ({
  className,
  children,
  disabled = false,
  legend,
}: FieldsetProps) => (
  <fieldset
    className={classNames(css.Fieldset, className)}
    data-testid="Fieldset"
    disabled={disabled}
  >
    {legend && <legend className={css.legend}>{legend}</legend>}
    {children}
  </fieldset>
);

export { Fieldset };

export default memo(Fieldset);
