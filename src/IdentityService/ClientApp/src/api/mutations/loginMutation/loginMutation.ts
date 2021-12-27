import api from "utils/api";

import { LoginFormData } from "./loginMutation.type";

const loginMutation = (formData: LoginFormData) =>
  api.post<LoginFormData>("/auth/login", formData);

export { loginMutation };
