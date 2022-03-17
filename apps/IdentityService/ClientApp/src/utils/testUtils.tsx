import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type WithQueryProps = {
  children?: ReactNode;
};

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

export { withQuery };
