import { classNames } from "@identity-service/core";
import React, { memo, useEffect, useRef } from "react";

import Spinner from "components/Spinner";

import css from "./Loading.module.scss";
import { LoadingProps } from "./Loading.type";

const Loading = ({ className, type }: LoadingProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;

    if (current?.parentElement) {
      const height = current.parentElement.clientHeight;

      current.parentElement.style.height = `${height}px`;

      current.parentElement.style.overflow = "hidden";

      current.style.height = `${current.parentElement.clientHeight}px`;
    }

    return () => {
      current?.parentElement?.style.removeProperty("height");

      current?.parentElement?.style.removeProperty("overflow");
    };
  }, []);

  return (
    <div className={classNames(css.Loading, className)} ref={ref}>
      <Spinner className={css.spinner} type={type} />
    </div>
  );
};

export { Loading };

export default memo(Loading);
