import { memo } from "react";

import { userManager } from "shared/lib/helpers";
import { useUserSession } from "shared/lib/hooks";

import css from "./Home.module.scss";

const Home = () => {
  const user = useUserSession();

  const logToken = async () => {
    const userData = await userManager.getUser();

    // eslint-disable-next-line no-console
    console.log("token", userData);
  };

  return (
    <div className={css.Home} data-testid="Home">
      <p className={css.token}>{user ? user.access_token : "logged out"}</p>
      <div>
        <button type="button" onClick={logToken}>
          Log User Data
        </button>
      </div>
    </div>
  );
};

export { Home };

export default memo(Home);
