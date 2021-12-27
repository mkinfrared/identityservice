/* eslint-disable react/display-name,import/no-unused-modules */
import { History } from "history";
import { Router } from "react-router-dom";

type StoryFunc<T extends JSX.Element> = () => T;

const withRouter =
  (history: History) =>
  <T extends JSX.Element>(Story: StoryFunc<T>) =>
    (
      <Router history={history}>
        <Story />
      </Router>
    );

export { withRouter };
