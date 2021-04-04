import { yupResolver } from "@hookform/resolvers/yup";
import { classNames, usePasswordVisibility } from "@identity-service/core";
import { Button, Card, Heading } from "@identity-service/ui";
import { loginMutation } from "api/mutations";
import InputField from "components/InputField";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "utils/validationSchemas";

import css from "./LoginForm.module.scss";
import { LoginFormData, LoginFormProps } from "./LoginForm.type";

const LoginForm = ({ className, returnUrl }: LoginFormProps) => {
  const defaultValues: LoginFormData = {
    username: "",
    password: "",
    returnUrl
  };

  const { register, formState, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues
  });

  const { errors, isValid, isSubmitting } = formState;
  const { togglePasswordVisibility, Icon, fieldType } = usePasswordVisibility();

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const redirectUrl = await loginMutation(formData);

      window.location.href = redirectUrl;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.dir(e);
    }
  };

  return (
    <Card className={classNames(css.LoginForm, className)}>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
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
        <div className={css.buttonWrapper}>
          <Button disabled={!isValid || isSubmitting}>Login</Button>
        </div>
      </form>
    </Card>
  );
};

export { LoginForm };

export default memo(LoginForm);
