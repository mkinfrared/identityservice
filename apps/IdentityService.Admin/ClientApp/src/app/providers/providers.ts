import { compose } from "shared/lib/helpers";

import { withRouter } from "./withRouter";
import { withStrictMode } from "./withStrictMode";

const withProviders = compose(withStrictMode, withRouter);

export { withProviders };
