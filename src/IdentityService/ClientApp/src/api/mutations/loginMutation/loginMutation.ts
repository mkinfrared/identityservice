import api from "utils/api";

import { LoginFormData } from "./loginMutation.type";

const loginMutation = async (formData: LoginFormData) => {
  const { data } = await api.post<string>("/auth/login", formData);

  return data;
};

export { loginMutation };
