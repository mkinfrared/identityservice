import api from "utils/api";

import { RegisterFormData } from "./registerMutation.type";

type Response = {
  userId: string;
  token: string;
  code: number | null;
};

const registerMutation = async (formData: RegisterFormData) => {
  const { data } = await api.post<Response>("/auth/register", formData);

  return data;
};

export { registerMutation };
