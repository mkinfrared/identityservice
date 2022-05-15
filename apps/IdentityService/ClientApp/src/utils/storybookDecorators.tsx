import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";

type StoryFunc<T extends JSX.Element> = () => T;

const withRouter = <T extends JSX.Element>(Story: StoryFunc<T>) => (
  <Router>
    <Story />
  </Router>
);

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
