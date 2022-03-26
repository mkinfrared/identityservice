import { useSearchParams } from "react-router-dom";

const useReturnUrl = () => {
  const [searchParams] = useSearchParams();
  const pascalCaseName = "ReturnUrl";
  const camelCaseName = "returnUrl";

  const returnUrl =
    searchParams.get(pascalCaseName) ?? searchParams.get(camelCaseName) ?? "";

  return returnUrl;
};

export { useReturnUrl };
