import { BrowserRouter } from "react-router-dom";

import useUserSession from "hooks/useUserSession";
import userManager from "utils/userManager";

import "./App.scss";

const App = () => {
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
    <BrowserRouter>
      <div className="App">
        <p>{user ? user.access_token : "logged out"}</p>
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
    </BrowserRouter>
  );
};

export default App;
