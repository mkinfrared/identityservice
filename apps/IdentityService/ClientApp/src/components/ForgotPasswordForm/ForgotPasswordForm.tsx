import { yupResolver } from "@hookform/resolvers/yup";
import { classNames } from "@identity-service/core";
import { Button, Heading } from "@identity-service/ui";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { submitForgotPassword } from "api/mutations";
import { ForgotPasswordDto } from "api/types";
import InputField from "components/InputField";
import { ReactComponent as Email } from "icons/email-icon.svg";
import { isAxiosError } from "utils/api";
import { forgotPasswordSchema } from "utils/validationSchemas";

import css from "./ForgotPasswordForm.module.scss";
import { ForgotPasswordFormProps } from "./ForgotPasswordForm.type";

const ForgotPasswordForm = ({
  className,
  returnUrl,
}: ForgotPasswordFormProps) => {
  const { register, formState, handleSubmit, setError } =
    useForm<ForgotPasswordDto>({
      defaultValues: {
        email: "",
        returnUrl,
      },
      resolver: yupResolver(forgotPasswordSchema),
      mode: "onTouched",
    });

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (values: ForgotPasswordDto) => {
    try {
      await submitForgotPassword(values);
    } catch (e) {
      if (isAxiosError(e)) {
        setError("email", { message: e.response?.statusText });
      }

      console.error(e);
    }
  };

  return (
    <div
      className={classNames(css.ForgotPasswordForm, className)}
      data-testid="ForgotPasswordForm"
    >
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Email className={css.icon} />
        <Heading className={css.heading}>Forgot Password</Heading>
        {isSubmitSuccessful ? (
          <Heading className={css.successMessage} variant="h4">
            Check your email
          </Heading>
        ) : (
          <>
            <InputField
              {...register("email")}
              autoComplete="off"
              error={errors.email?.message}
              placeholder="Email"
            />
            <div className={css.buttonWrapper}>
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export { ForgotPasswordForm };

export default memo(ForgotPasswordForm);
