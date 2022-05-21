/* eslint-disable no-console */
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import useUserManager from "hooks/useUserManager";

import css from "./SignInCallback.module.scss";

const SignInCallback = () => {
  const userManager = useUserManager();
  const router = useRouter();

  const signInRedirect = useCallback(async () => {
    try {
      const user = await userManager?.signinRedirectCallback();

      console.log("signin response success", user);
    } catch (e) {
      console.error("signinRedirectCallback error");

      console.error(e);
    } finally {
      router.push("/");
    }
  }, [userManager]);

  useEffect(() => {
    signInRedirect();
  }, [signInRedirect]);

  return (
    <div className={css.SignInCallback}>
      <noscript> You need to enable JavaScript to run this app.</noscript>

      <h2>You are being redirected to the authorized application</h2>

      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        If your browser doesn't redirect you back,
        <Link href="/">
          <a> click here </a>
        </Link>
        to continue
      </p>
    </div>
  );
};

export default SignInCallback;
