import { ReactComponent as Hidden } from "icons/visibility-off.svg";
import { ReactComponent as Visible } from "icons/visibility.svg";
import React, { useCallback, useMemo, useState } from "react";

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

  const fieldType = visible ? "text" : "password";

  return { togglePasswordVisibility, Icon, fieldType };
};

export { usePasswordVisibility };
