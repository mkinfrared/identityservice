import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

const withRouter = (element: ReactNode) => (
  <MemoryRouter>{element}</MemoryRouter>
);

export { withRouter };
