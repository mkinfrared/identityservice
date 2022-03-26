import { yupResolver } from "@hookform/resolvers/yup";
import {
  classNames,
  getFormErrors,
  usePasswordVisibility,
} from "@identity-service/core";
import { Button, Heading, Text } from "@identity-service/ui";
import { AxiosError } from "axios";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { loginMutation } from "api/mutations";
import { LoginCommand } from "api/types";
import AppLink from "components/AppLink";
import InputField from "components/InputField";
import { MainRoutes } from "routes/MainRoute";
import { isAxiosError } from "utils/api";
import { loginSchema } from "utils/validationSchemas";

import css from "./LoginForm.module.scss";
import { LoginFormProps } from "./LoginForm.type";

const LoginForm = ({ className, returnUrl }: LoginFormProps) => {
  const defaultValues: LoginCommand = {
    username: "",
    password: "",
    returnUrl,
  };

  const { register, formState, handleSubmit, setError } = useForm<LoginCommand>(
    {
      resolver: yupResolver(loginSchema),
      mode: "onChange",
      defaultValues,
    },
  );

  const { errors, isValid, isSubmitting } = formState;
  const { togglePasswordVisibility, Icon, fieldType } = usePasswordVisibility();

  const onSubmit = async (formData: LoginCommand) => {
    try {
      await loginMutation(formData);

      window.location.href = returnUrl;
    } catch (e) {
      if (isAxiosError(e)) {
        const { response } = e as AxiosError;

        const submitErrors = getFormErrors(
          response?.data as BadRequest<LoginCommand>,
        );

        submitErrors.forEach(({ name, message, type }) => {
          setError(name, { message, type });
        });
      }

      console.error(e);
    }
  };

  return (
    <div className={classNames(css.LoginForm, className)}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Heading className={css.heading}>Login</Heading>
        <InputField
          {...register("username")}
          className={css.input}
          label="Username"
          error={errors.username?.message}
        />
        <InputField
          {...register("password")}
          className={css.input}
          label="Password"
          suffix={Icon}
          onSuffixClick={togglePasswordVisibility}
          type={fieldType}
          error={errors.password?.message}
        />
        <input type="text" value={returnUrl} hidden name="returnUrl" readOnly />
        <Text className={classNames(css.text, css.forgotPassword)}>
          <AppLink to={MainRoutes.FORGOT_PASSWORD}>Forgot password?</AppLink>
        </Text>
        <Text className={css.text}>
          No account yet? Consider{" "}
          <AppLink to={MainRoutes.REGISTER}>register</AppLink>
        </Text>
        <div className={css.buttonWrapper}>
          <Button
            disabled={!isValid || isSubmitting}
            type="submit"
            loading={isSubmitting}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export { LoginForm };

export default memo(LoginForm);
