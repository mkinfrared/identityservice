import { ResetPasswordCommand } from "api/types";
import api from "utils/api";

const submitPasswordChange = async (values: ResetPasswordCommand) => {
  const { data } = await api.post("/auth/resetPassword", values);

  return data;
};

export { submitPasswordChange };
