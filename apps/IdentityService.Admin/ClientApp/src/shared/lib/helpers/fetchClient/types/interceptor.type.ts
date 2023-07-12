import { ClientConfig, FetchResponse } from "./fetchClient.type";

export type RejectCallback = ((error: Error) => Error) | undefined;

export type RequestInterceptor = (
  config: ClientConfig,
) => ClientConfig | Promise<ClientConfig>;

export type ResponseInterceptor = <T = any>(
  response: FetchResponse<T>,
) => FetchResponse | Promise<FetchResponse>;

export type IntcptrRequest = {
  use: (onFulfilled: RequestInterceptor, onRejected?: RejectCallback) => number;
  eject: (interceptorId: number) => void;
  clear: () => void;
};

export type IntcptrResponse = {
  use: (
    onFulfilled: ResponseInterceptor,
    onRejected?: RejectCallback,
  ) => number;
  eject: (interceptorId: number) => void;
  clear: () => void;
};

export type InternalRequest = {
  onFulfilled: RequestInterceptor;
  onRejected?: RejectCallback;
  interceptorId: number;
};

export type InternalResponse = {
  onFulfilled: ResponseInterceptor;
  onRejected?: RejectCallback;
  interceptorId: number;
};
