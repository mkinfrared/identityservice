import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MainRoutes } from "routes/MainRoute";

const useAppNavigate = () => {
  const { search, hash } = useLocation();
  const navigate = useNavigate();

  const appNavigate = useCallback(
    (pathname: MainRoutes) => {
      navigate({ pathname, search, hash });
    },
    [hash, navigate, search],
  );

  return appNavigate;
};

export { useAppNavigate };
