import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { PortalProps } from "./Portal.type";

const Portal = ({ children, container, replaceHtml = true }: PortalProps) => {
  const [htmlElement, setHtmlElement] = useState(container.current);

  useEffect(() => {
    const { current } = container;

    if (current && replaceHtml && !htmlElement) {
      current.innerHTML = "";
    }

    setHtmlElement(current);
  }, [container, htmlElement, replaceHtml]);

  if (!htmlElement) {
    return null;
  }

  if (replaceHtml && !htmlElement) {
    return null;
  }

  return createPortal(children, htmlElement);
};

export { Portal };

export default memo(Portal);
