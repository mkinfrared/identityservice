import { useQuery } from "react-query";

import { getConsent } from "api/queries";

const useConsentQuery = (returnUrl: string) =>
  useQuery(["consent", returnUrl], () => getConsent(returnUrl));

export { useConsentQuery };
