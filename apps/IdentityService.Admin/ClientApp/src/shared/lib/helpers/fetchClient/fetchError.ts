import { FetchRequestInfo, FetchResponse } from "./types/fetchClient.type";

class FetchError extends Error {
  status?: number;

  statusText?: string;

  request?: FetchRequestInfo;

  response?: FetchResponse;

  name = "FetchError";

  constructor(
    message?: string,
    status?: number,
    statusText?: string,
    request?: FetchRequestInfo,
    response?: FetchResponse,
  ) {
    super(message);

    this.status = status;

    this.statusText = statusText;

    this.request = request;

    this.response = response;
  }
}

const isFetchError = (error: any): error is FetchError =>
  error instanceof FetchError && error.name === "FetchError";

export { FetchError, isFetchError };
