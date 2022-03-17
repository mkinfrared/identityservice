import { AxiosResponse } from "axios";

import { ConsentUpdateDto } from "api/types";
import api from "utils/api";

const submitConsent = async (consentDto: ConsentUpdateDto) => {
  const { data } = await api.post<ConsentUpdateDto, AxiosResponse<string>>(
    "/consent/submitConsent",
    consentDto,
  );

  return data;
};

export { submitConsent };
