import api from "utils/api";

type LoginFormData = {
  username: string;
  password: string;
  returnUrl: string;
};

const loginMutation = async (formData: LoginFormData) => {
  const { data } = await api.post<string>("/auth", formData);

  return data;
};

export { loginMutation };
