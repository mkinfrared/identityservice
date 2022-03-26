import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import Main from "pages/Main";
import queryClient from "utils/queryClient";

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
