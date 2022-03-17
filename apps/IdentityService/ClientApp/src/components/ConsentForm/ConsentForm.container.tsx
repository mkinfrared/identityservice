import { memo } from "react";

import { ApiScopeUpdateDto, ConsentUpdateDto } from "api/types";
import { useConsentQuery } from "hooks/useConsentQuery";

import ConsentFormFC from "./ConsentForm";
import { ConsentFormContainerProps } from "./ConsentForm.type";

const ConsentFormContainer = ({ returnUrl }: ConsentFormContainerProps) => {
  const { data } = useConsentQuery(returnUrl);

  const mapScope = (scope: ApiScopeUpdateDto) => ({
    ...scope,
    isPermitted: scope.required,
  });

  const defaultValues: ConsentUpdateDto = {
    rememberConsent: false,
    description: "",
    permissionGranted: false,
    redirectUrl: data?.returnUrl ?? "",
    identityScopes: data?.identityScopes?.map(mapScope) ?? [],
    apiScopes: data?.apiScopes?.map(mapScope) ?? [],
  };

  return (
    <ConsentFormFC
      allowRememberConsent={!!data?.allowRememberConsent}
      clientName={data?.clientName ?? ""}
      defaultValues={defaultValues}
      returnUrl={returnUrl}
    />
  );
};

export default memo(ConsentFormContainer);
