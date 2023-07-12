import { StrictMode } from "react";

import { HocProvider } from "./provider.type";

const withStrictMode: HocProvider = (Cmp) => {
  const provider = () => (
    <StrictMode>
      <Cmp />
    </StrictMode>
  );

  return provider;
};

export { withStrictMode };
