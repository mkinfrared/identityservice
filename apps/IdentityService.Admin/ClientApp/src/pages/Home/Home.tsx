import { memo } from "react";

import useUserSession from "hooks/useUserSession";
import userManager from "utils/userManager";

import css from "./Home.module.scss";

const Home = () => {
  const user = useUserSession();

  const logIn = () => {
    userManager.signinRedirect();
  };

  const logOut = () => {
    userManager.signoutRedirect();
  };

  const logToken = async () => {
    const userData = await userManager.getUser();

    // eslint-disable-next-line no-console
    console.log("token", userData);
  };

  return (
    <div className={css.Home} data-testid="Home">
      <code>{user ? user.access_token : "logged out"}</code>
      <div>
        <button type="button" onClick={logIn}>
          Login
        </button>
        <button type="button" onClick={logToken}>
          Log User Data
        </button>
        <button type="button" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export { Home };

export default memo(Home);
