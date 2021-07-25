import { yupResolver } from "@hookform/resolvers/yup";
import {
  classNames,
  getFormErrors,
  usePasswordVisibility
} from "@identity-service/core";
import { Button, Card, Heading } from "@identity-service/ui";
import { AxiosError } from "axios";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { registerMutation } from "api/mutations";
import { RegisterFormData } from "api/mutations/registerMutation/registerMutation.type";
import InputField from "components/InputField";
import { registerSchema } from "utils/validationSchemas";

import css from "./RegisterForm.module.scss";
import { RegisterFormProps } from "./RegisterForm.type";

const RegisterForm = ({ className, returnUrl }: RegisterFormProps) => {
  const defaultValues: RegisterFormData = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    redirectUrl: returnUrl
  };

  const { register, formState, handleSubmit, setError } =
    useForm<RegisterFormData>({
      defaultValues,
      mode: "onChange",
      resolver: yupResolver(registerSchema)
    });

  const { errors, isValid, isSubmitting } = formState;
  const { togglePasswordVisibility, fieldType, Icon } = usePasswordVisibility();

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      const redirectUrl = await registerMutation(formData);

      window.location.href = redirectUrl;
    } catch (e) {
      if (e?.isAxiosError && e?.response?.status === 400) {
        const { response } = e as AxiosError;

        const submitErrors = getFormErrors(
          response?.data as BadRequest<RegisterFormData>
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className={css.buttonWrapper}>
          <Button disabled={!isValid || isSubmitting}>Register</Button>
        </div>
      </form>
    </Card>
  );
};

export { RegisterForm };

export default memo(RegisterForm);
