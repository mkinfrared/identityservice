import { LoginCommand } from "api/types";
import api from "utils/api";

const loginMutation = (formData: LoginCommand) =>
  api.post("/auth/login", formData);

export { loginMutation };
