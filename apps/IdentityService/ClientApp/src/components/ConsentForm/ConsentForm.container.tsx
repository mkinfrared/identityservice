import { memo } from "react";

import { ApiScopeUpdateDto, ConsentUpdateDto } from "api/types";
import { useReturnUrl } from "hooks";
import { useConsentQuery } from "hooks/useConsentQuery";

import ConsentFormFC from "./ConsentForm";
import { ConsentFormContainerProps } from "./ConsentForm.type";

const ConsentFormContainer = (props: ConsentFormContainerProps) => {
  const returnUrl = useReturnUrl();
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
      {...props}
      allowRememberConsent={!!data?.allowRememberConsent}
      clientName={data?.clientName ?? ""}
      defaultValues={defaultValues}
      returnUrl={returnUrl}
    />
  );
};

export default memo(ConsentFormContainer);
