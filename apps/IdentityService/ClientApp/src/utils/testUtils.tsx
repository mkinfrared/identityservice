import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

type WithQueryProps = {
  children?: ReactNode;
};

const withRouter = ({ children }: WithQueryProps) => (
  <MemoryRouter>{children}</MemoryRouter>
);

const withQuery = ({ children }: WithQueryProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { withRouter, withQuery };
