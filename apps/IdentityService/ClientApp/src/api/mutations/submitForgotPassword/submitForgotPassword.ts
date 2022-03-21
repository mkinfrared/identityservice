import { ForgotPasswordDto } from "api/types";
import api from "utils/api";

const submitForgotPassword = async (values: ForgotPasswordDto) => {
  const { data } = await api.post("/auth/forgotPassword", values);

  return data;
};

export { submitForgotPassword };
