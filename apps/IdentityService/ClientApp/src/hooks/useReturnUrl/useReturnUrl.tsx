import { useLocation } from "react-use";

const useReturnUrl = () => {
  const { search } = useLocation();
  const pascalCaseName = "ReturnUrl";
  const camelCaseName = "returnUrl";
  const params = new URLSearchParams(search);

  const returnUrl =
    params.get(pascalCaseName) ?? params.get(camelCaseName) ?? "";

  return returnUrl;
};

export { useReturnUrl };
