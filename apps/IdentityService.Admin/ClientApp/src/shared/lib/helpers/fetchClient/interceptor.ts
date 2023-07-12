import {
  IntcptrRequest,
  IntcptrResponse,
  InternalRequest,
  InternalResponse,
  RejectCallback,
  RequestInterceptor,
  ResponseInterceptor,
} from "./types/interceptor.type";

class Interceptor {
  currentId = 0;

  requestInterceptors: InternalRequest[] = [];

  responseInterceptors: InternalResponse[] = [];

  request: IntcptrRequest;

  response: IntcptrResponse;

  constructor() {
    this.request = {
      use: this.addRequestInterceptor,
      eject: this.removeRequestInterceptor,
      clear: this.deleteRequestInterceptor,
    };

    this.response = {
      use: this.addResponseInterceptor,
      eject: this.removeResponseInterceptor,
      clear: this.deleteResponseInterceptor,
    };
  }

  addRequestInterceptor = (
    onFulfilled: RequestInterceptor,
    onRejected?: RejectCallback,
  ) => {
    const interceptorId = this.currentId;

    this.currentId++;

    this.requestInterceptors.push({
      onFulfilled,
      onRejected,
      interceptorId,
    });

    return interceptorId;
  };

  addResponseInterceptor = (
    onFulfilled: ResponseInterceptor,
    onRejected?: RejectCallback,
  ) => {
    const interceptorId = this.currentId;

    this.currentId++;

    this.responseInterceptors.push({
      onFulfilled,
      onRejected,
      interceptorId,
    });

    return interceptorId;
  };

  removeRequestInterceptor = (interceptorId: number) => {
    this.requestInterceptors = this.requestInterceptors.filter(
      (value) => value.interceptorId !== interceptorId,
    );
  };

  removeResponseInterceptor = (interceptorId: number) => {
    this.responseInterceptors = this.responseInterceptors.filter(
      (value) => value.interceptorId !== interceptorId,
    );
  };

  deleteRequestInterceptor = () => {
    this.responseInterceptors = [];
  };

  deleteResponseInterceptor = () => {
    this.responseInterceptors = [];
  };

  get requests() {
    return this.requestInterceptors;
  }

  get responses() {
    return this.responseInterceptors;
  }
}

export default Interceptor;
