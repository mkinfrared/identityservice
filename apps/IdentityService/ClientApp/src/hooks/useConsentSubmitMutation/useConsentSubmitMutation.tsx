import { useMutation } from "react-query";

import { submitConsent } from "api/mutations";

const useConsentSubmitMutation = () => useMutation(submitConsent);

export { useConsentSubmitMutation };
