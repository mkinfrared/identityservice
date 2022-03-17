import { ConsentReadDto } from "api/types";
import api from "utils/api";

const getConsent = async (returnUrl: string) => {
  const params = { returnUrl };

  const { data } = await api.get<ConsentReadDto>("/consent/getConsent", {
    params,
  });

  return data;
};

export { getConsent };
