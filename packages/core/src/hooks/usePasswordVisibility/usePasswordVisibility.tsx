import React, { useCallback, useMemo, useState } from "react";

import { ReactComponent as Hidden } from "icons/visibility-off.svg";
import { ReactComponent as Visible } from "icons/visibility.svg";

const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const Icon = useMemo(() => {
    if (visible) {
      return <Hidden />;
    }

    return <Visible />;
  }, [visible]);

  const fieldType: "text" | "password" = visible ? "text" : "password";

  return { togglePasswordVisibility, Icon, fieldType };
};

export { usePasswordVisibility };
