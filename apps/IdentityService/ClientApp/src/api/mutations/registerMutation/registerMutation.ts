import { ConfirmEmailCommand, RegisterCommand } from "api/types";
import api from "utils/api";

const registerMutation = async (formData: RegisterCommand) => {
  const { data } = await api.post<ConfirmEmailCommand>(
    "/auth/register",
    formData,
  );

  return data;
};

export { registerMutation };
