import { classNames } from "@identity-service/core";

import css from "./Main.module.scss";
import { MainProps } from "./Main.type";

const Main = ({ className, children }: MainProps) => (
  <main className={classNames(css.Main, className)} data-testid="Main">
    <section className={css.page}>{children}</section>
  </main>
);

export default Main;
