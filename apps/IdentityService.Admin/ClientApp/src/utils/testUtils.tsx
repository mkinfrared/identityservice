import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

type WithQueryProps = {
  children?: ReactNode;
};

const withRouter = ({ children }: WithQueryProps) => (
  <MemoryRouter>{children}</MemoryRouter>
);

export { withRouter };
