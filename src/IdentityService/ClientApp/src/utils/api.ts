import axios from "axios";

import { BASE_URL } from "utils/secrets";

const { isAxiosError } = axios;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { isAxiosError };

export default api;
