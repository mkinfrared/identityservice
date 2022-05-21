import Head from "next/head";
import Image from "next/image";

import Base from "components/Base";
import useUserManager from "hooks/useUserManager";
import useUserSession from "hooks/useUserSession";
import styles from "pages/index.module.css";

const Home = () => {
  const userManager = useUserManager();
  const { user } = useUserSession();

  const logIn = () => {
    userManager?.signinRedirect();
  };

  const logOut = () => {
    userManager?.signoutRedirect();
  };

  const logToken = async () => {
    const userData = await userManager?.getUser();

    // eslint-disable-next-line no-console
    console.log("token", userData);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Base />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="https://vercel.com/new" className={styles.card}>
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
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
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
