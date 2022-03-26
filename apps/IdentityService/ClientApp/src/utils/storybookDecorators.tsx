/* eslint-disable react/display-name,import/no-unused-modules */
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import { unstable_HistoryRouter as Router } from "react-router-dom";

type StoryFunc<T extends JSX.Element> = () => T;

const withRouter = <T extends JSX.Element>(Story: StoryFunc<T>) => {
  const history = createMemoryHistory();

  return (
    <Router history={history as any}>
      <Story />
    </Router>
  );
};

const withQueryProvider = <T extends JSX.Element>(Story: StoryFunc<T>) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <Story />
    </QueryClientProvider>
  );
};

export { withRouter, withQueryProvider };
