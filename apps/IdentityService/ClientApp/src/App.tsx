import { useTheme } from "@identity-service/ui";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import Main from "pages/Main";
import queryClient from "utils/queryClient";

const App = () => {
  useTheme("identity-service-theme");

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
