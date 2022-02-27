import { ConfirmEmailCommand } from "api/types";
import api from "utils/api";

const verifyEmailMutation = (data: ConfirmEmailCommand) =>
  api.post("/auth/verifyEmail", data);

export { verifyEmailMutation };
