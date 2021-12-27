import api from "utils/api";

import { VerifyEmailData } from "./verifyEmailMutation.type";

const verifyEmailMutation = (data: VerifyEmailData) =>
  api.post<VerifyEmailData>("/auth/verifyEmail", data);

export { verifyEmailMutation };
