import { yupResolver } from "@hookform/resolvers/yup";
import {
  classNames,
  getFormErrors,
  usePasswordVisibility,
} from "@identity-service/core";
import { Button, Card, Heading, Text } from "@identity-service/ui";
import { MouseEventHandler, memo } from "react";
import { useForm } from "react-hook-form";

import { registerMutation } from "api/mutations";
import { RegisterFormData } from "api/mutations/registerMutation/registerMutation.type";
import InputField from "components/InputField";
import { Routes } from "pages/Main/Main.type";
import { isAxiosError } from "utils/api";
import { registerSchema } from "utils/validationSchemas";

import css from "./RegisterForm.module.scss";
import { RegisterFormProps } from "./RegisterForm.type";

const RegisterForm = ({ className, returnUrl }: RegisterFormProps) => {
  const defaultValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    redirectUrl: returnUrl,
  };

  const { register, formState, handleSubmit, setError } =
    useForm<RegisterFormData>({
      defaultValues,
      mode: "onChange",
      resolver: yupResolver(registerSchema),
    });

  const { errors, isValid, isSubmitting } = formState;
  const { togglePasswordVisibility, fieldType, Icon } = usePasswordVisibility();

  const handleLoginClick: MouseEventHandler = (event) => {
    event.preventDefault();

    const { location, history } = window;
    const pathname = `/account/${Routes.LOGIN}`;
    const url = new URL(location.href);

    url.pathname = pathname;

    history.replaceState({}, "", url.toString());
  };

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      const { token, userId } = await registerMutation(formData);

      sessionStorage.setItem("emailToken", token ?? "");

      sessionStorage.setItem("userId", userId);

      sessionStorage.setItem("returnUrl", returnUrl);

      const { location, history } = window;
      const pathname = `/account/${Routes.CONFIRM_EMAIL}`;
      const url = new URL(location.href);

      url.pathname = pathname;

      history.replaceState({}, "", url.toString());
    } catch (e) {
      if (isAxiosError(e)) {
        const { response } = e;

        const submitErrors = getFormErrors(
          response?.data as BadRequest<RegisterFormData>,
        );

        submitErrors.forEach(({ name, message, type }) => {
          setError(name, { message, type });
        });
      }

      console.error(e);
    }
  };

  return (
    <Card className={classNames(css.RegisterForm, className)}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Heading className={css.heading}>Register</Heading>
        <InputField
          {...register("username")}
          className={css.input}
          label="Username"
          error={errors.username?.message}
        />
        <InputField
          {...register("firstName")}
          className={css.input}
          label="First Name"
          error={errors.firstName?.message}
        />
        <InputField
          {...register("lastName")}
          className={css.input}
          label="Last Name"
          error={errors.lastName?.message}
        />
        <InputField
          {...register("email")}
          className={css.input}
          label="Email"
          error={errors.email?.message}
        />
        <InputField
          {...register("phoneNumber")}
          className={css.input}
          label="Phone Number"
          error={errors.phoneNumber?.message}
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
        <InputField
          {...register("passwordConfirmation")}
          className={css.input}
          label="Confirm Password"
          suffix={Icon}
          onSuffixClick={togglePasswordVisibility}
          type={fieldType}
          error={errors.passwordConfirmation?.message}
        />
        <input
          type="text"
          value={returnUrl}
          hidden
          name="redirectUrl"
          readOnly
        />
        <Text className={css.text}>
          Already have an account. Consider{" "}
          <a href="/account/login" onClick={handleLoginClick}>
            login
          </a>
        </Text>
        <div className={css.buttonWrapper}>
          <Button disabled={!isValid || isSubmitting} type="submit">
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
};

export { RegisterForm };

export default memo(RegisterForm);
