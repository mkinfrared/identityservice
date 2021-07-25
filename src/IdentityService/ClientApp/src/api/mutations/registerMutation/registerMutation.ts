import api from "utils/api";

import { RegisterFormData } from "./registerMutation.type";

const registerMutation = async (formData: RegisterFormData) => {
  const { data } = await api.post<string>("/auth/register", formData);

  return data;
};

export { registerMutation };
