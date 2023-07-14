import { BrowserRouter } from "react-router-dom";

import { HocProvider } from "./provider.type";

const withRouter: HocProvider = (Cmp) => {
  const provider = () => (
    <BrowserRouter>
      <Cmp />
    </BrowserRouter>
  );

  return provider;
};

export { withRouter };
