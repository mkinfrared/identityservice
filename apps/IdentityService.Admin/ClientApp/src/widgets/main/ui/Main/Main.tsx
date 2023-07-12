import css from "./Main.module.scss";
import { MainProps } from "./Main.type";

const Main = ({ className, children }: MainProps) => {
  const classNames = [css.Main, className].filter(Boolean).join(" ");

  return (
    <main className={classNames} data-testid="Main">
      <section className={css.page}>{children}</section>
    </main>
  );
};

export default Main;
