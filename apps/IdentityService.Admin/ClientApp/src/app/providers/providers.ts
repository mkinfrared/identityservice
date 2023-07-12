import { compose } from "shared/lib/helpers";

import { withStrictMode } from "./withStrictMode";

const withProviders = compose(withStrictMode);

export { withProviders };
