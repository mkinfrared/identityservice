import { memo, useEffect, useState } from "react";

const LoginForm = () => {
  const [returnUrl, setReturnUrl] = useState("");
  const action = "https://localhost:9001/auth";

  useEffect(() => {
    const { location } = window;
    const name = "ReturnUrl";
    const params = new URLSearchParams(location.search);
    const returnUrlParam = params.get(name) ?? "";

    setReturnUrl(returnUrlParam);
  }, []);

  return (
    <form action={action} method="post">
      <input type="text" name="username" />
      <input type="text" name="password" />
      <input type="text" name="returnUrl" hidden value={returnUrl} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default memo(LoginForm);
