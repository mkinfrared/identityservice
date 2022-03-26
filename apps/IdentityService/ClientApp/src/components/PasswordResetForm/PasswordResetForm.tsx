import { yupResolver } from "@hookform/resolvers/yup";
import { classNames, usePasswordVisibility } from "@identity-service/core";
import { Button, Heading } from "@identity-service/ui";
import { ChangeEventHandler, memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { submitPasswordChange } from "api/mutations";
import { ResetPasswordCommand } from "api/types";
import InputField from "components/InputField";
import { useAppNavigate } from "hooks";
import { MainRoutes } from "routes/MainRoute";
import { passwordResetSchema } from "utils/validationSchemas";

import css from "./PasswordResetForm.module.scss";
import { PasswordResetFormProps } from "./PasswordResetForm.type";

const PasswordResetForm = ({
  className,
  token,
  userId,
}: PasswordResetFormProps) => {
  const { register, formState, handleSubmit, setValue, getValues } =
    useForm<ResetPasswordCommand>({
      defaultValues: {
        password: "",
        confirmPassword: "",
        token,
        userId,
      },
      resolver: yupResolver(passwordResetSchema),
      mode: "onChange",
    });

  const navigate = useAppNavigate();
  const { togglePasswordVisibility, Icon, fieldType } = usePasswordVisibility();
  const { errors, isSubmitting, isValid } = formState;

  const onSubmit = async (data: ResetPasswordCommand) => {
    try {
      await submitPasswordChange(data);

      navigate(MainRoutes.LOGIN);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { value, name } = event.target;

      if (fieldType === "password") {
        setValue(name as keyof ResetPasswordCommand, value, {
          shouldValidate: true,
        });

        return;
      }

      setValue("password", value, { shouldValidate: true });

      setValue("confirmPassword", value, { shouldValidate: true });
    },
    [fieldType, setValue],
  );

  useEffect(() => {
    if (fieldType === "text") {
      const passwordValue = getValues("password");

      setValue("confirmPassword", passwordValue);
    }
  }, [fieldType]);

  return (
    <div
      className={classNames(css.PasswordResetForm, className)}
      data-testid="PasswordResetForm"
    >
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Heading className={css.heading}>Change password</Heading>
        <InputField
          {...register("password")}
          onChange={handleChange}
          className={css.input}
          label="Password"
          error={errors.password?.message}
          type={fieldType}
          suffix={Icon}
          onSuffixClick={togglePasswordVisibility}
        />
        <InputField
          {...register("confirmPassword")}
          onChange={handleChange}
          className={css.input}
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          type={fieldType}
          suffix={Icon}
          onSuffixClick={togglePasswordVisibility}
        />
        <div className={css.buttonWrapper}>
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PasswordResetForm };

export default memo(PasswordResetForm);
