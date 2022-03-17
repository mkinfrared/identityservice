/* eslint-disable react/display-name,import/no-unused-modules */
import { History } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
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

const withQueryProvider = <T extends JSX.Element>(Story: StoryFunc<T>) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Story />
    </QueryClientProvider>
  );
};

export { withRouter, withQueryProvider };
