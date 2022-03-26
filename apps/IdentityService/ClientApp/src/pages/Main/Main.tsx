import { classNames } from "@identity-service/core";
import { Card, Spinner } from "@identity-service/ui";
import { Suspense, memo } from "react";

import MainRoute from "routes/MainRoute";

import css from "./Main.module.scss";
import { MainProps } from "./Main.type";

const Main = ({ className }: MainProps) => (
  <div className={classNames(css.Main, className)}>
    <Card className={css.card}>
      <Suspense fallback={<Spinner className={css.spinner} type="infinity" />}>
        <MainRoute className={css.formContainer} />
      </Suspense>
    </Card>
  </div>
);

export { Main };

export default memo(Main);
