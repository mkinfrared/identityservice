import { useLocation } from "react-use";

const useReturnUrl = () => {
  const { search } = useLocation();
  const name = "ReturnUrl";
  const params = new URLSearchParams(search);
  const returnUrl = params.get(name) ?? "";

  return returnUrl;
};

export { useReturnUrl };
