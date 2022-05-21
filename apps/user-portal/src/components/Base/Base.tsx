import React, { memo } from "react";

import css from "./Base.module.scss";

const Base = () => (
  <div className={css.Base} data-testid="Base">
    Base works!!
  </div>
);

export { Base };

export default memo(Base);
