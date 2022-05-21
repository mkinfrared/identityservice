import { classNames } from "@identity-service/core";
import { Button, Fieldset, Heading } from "@identity-service/ui";
import { Fragment, memo, useCallback, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import CheckboxField from "components/CheckboxField";
import ToggleField from "components/ToggleField";
import { useConsentSubmitMutation } from "hooks/useConsentSubmitMutation";

import css from "./ConsentForm.module.scss";
import { ConsentFormProps } from "./ConsentForm.type";

const ConsentForm = ({
  allowRememberConsent,
  className,
  clientName,
  defaultValues,
}: ConsentFormProps) => {
  const { isLoading, mutateAsync } = useConsentSubmitMutation();

  const { getValues, register, control } = useForm({
    defaultValues,
  });

  const { fields: identityFields } = useFieldArray({
    control,
    name: "identityScopes",
  });

  const { fields: apiFields } = useFieldArray({
    control,
    name: "apiScopes",
  });

  const identityScopes = useMemo(
    () =>
      identityFields.map((field, index) => (
        <Fragment key={field.id}>
          <ToggleField
            {...register(`identityScopes.${index}.isPermitted` as const)}
            label={field.displayName ?? ""}
            className={css.input}
            defaultChecked={field.required}
            readOnly={field.required}
          />
          <Heading variant="h6" className={css.description}>
            {field.description}
          </Heading>
        </Fragment>
      )),
    [identityFields, register],
  );

  const apiScopes = useMemo(
    () =>
      apiFields.map(({ displayName, description, required, id }, index) => (
        <Fragment key={id}>
          <ToggleField
            {...register(`apiScopes.${index}.isPermitted` as const)}
            label={displayName ?? ""}
            className={css.input}
            defaultChecked={required}
            readOnly={required}
          />
          <Heading variant="h6" className={css.description}>
            {description}
          </Heading>
        </Fragment>
      )),
    [apiFields, register],
  );

  const handleClick = useCallback(
    (isPermitted: boolean) => async () => {
      const formData = getValues();

      formData.permissionGranted = isPermitted;

      try {
        const url = await mutateAsync(formData);

        window.location.href = url;
      } catch (e) {
        console.error(e);
      }
    },
    [getValues, mutateAsync],
  );

  return (
    <div
      className={classNames(css.ConsentForm, className)}
      data-testid="ConsentForm"
    >
      <Heading variant="h3" className={css.heading}>
        {clientName} is requesting your permissions
      </Heading>
      <Heading variant="h6" className={css.text}>
        Uncheck the permissions you do not wish to grant.
      </Heading>
      <form className={css.form}>
        <Fieldset className={css.fieldset} legend="Personal Information">
          {identityScopes}
        </Fieldset>
        <Fieldset className={css.fieldset} legend="Application Access">
          {apiScopes}
        </Fieldset>
        {allowRememberConsent && (
          <CheckboxField
            label="Remember my choice"
            className={css.input}
            {...register("rememberConsent")}
          />
        )}
        <div className={css.buttonWrapper}>
          <Button
            disabled={isLoading}
            loading={isLoading}
            onClick={handleClick(true)}
          >
            Allow
          </Button>
          <Button
            disabled={isLoading}
            loading={isLoading}
            onClick={handleClick(false)}
          >
            Deny
          </Button>
        </div>
      </form>
    </div>
  );
};

export { ConsentForm };

export default memo(ConsentForm);
