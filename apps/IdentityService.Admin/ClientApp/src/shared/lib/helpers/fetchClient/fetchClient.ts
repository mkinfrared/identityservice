import { FetchError } from "./fetchError";
import Interceptor from "./interceptor";
import {
  ClientConfig,
  FetchRequestInfo,
  FetchResponse,
  Method,
  Params,
  isArrayBuffer,
  isBlob,
  isFormData,
  isXMLHttpRequestBodyInit,
} from "./types/fetchClient.type";

/**
 * FetchClient is a utility class to make HTTP requests.
 * It provides methods to perform GET, POST, PUT, and DELETE requests.
 * It also supports interceptors to modify requests and responses.
 *
 * @example
 * const client = FetchClient.create({ baseURL: "https://api.example.com" });
 * client.get("/users").then(response => {
 *   console.log(response.data); // => [{ id: 1, name: "John Doe" }, ...]
 * });
 */
class FetchClient {
  initConfig: ClientConfig;

  currentConfig: ClientConfig;

  /**
   * Interceptor instance to manage request and response interceptors.
   */
  interceptors = new Interceptor();

  /**
   * Creates a new FetchClient instance with the given configuration.
   *
   * @param {ClientConfig} [config] - Configuration for the FetchClient instance.
   * @throws {Error} If a baseURL is not provided in a Node JS environment.
   */
  constructor(config?: ClientConfig) {
    if (!config?.baseURL && typeof window === "undefined") {
      throw new Error(
        "You are trying to create a client in Node JS environment, but you did not provide a baseURL",
      );
    }

    const defaultBaseUrl =
      typeof window === "undefined" ? "" : window?.location?.host ?? "";

    const defaults: ClientConfig = {
      responseType: "json",
      baseURL: defaultBaseUrl,
    };

    this.initConfig = { ...defaults, ...config };

    this.currentConfig = { ...this.initConfig };
  }

  /**
   * Static method to create a new FetchClient instance.
   *
   * @param {ClientConfig} [config] - Configuration for the FetchClient instance.
   * @returns {FetchClient} A new FetchClient instance.
   *
   * @example
   * const client = FetchClient.create({ baseURL: "https://api.example.com" });
   */
  static create = (config?: ClientConfig) => new this(config);

  /**
   * Sends a GET request to the specified URL.
   *
   * @template T - The expected response data type.
   * @param {string | URL} url - The URL to send the request to.
   * @param {ClientConfig} [config] - Configuration for the request.
   * @returns {Promise<FetchResponse<T>>} A promise that resolves to the response.
   *
   * @example
   * client.get("/users").then(response => {
   *   console.log(response.data); // => [{ id: 1, name: "John Doe" }, ...]
   * });
   */
  get = <T = unknown>(url: URL | string, config?: ClientConfig) =>
    this.#sendRequest<T>(url, "GET", null, config);

  /**
   * Sends a POST request to the specified URL with the given data.
   *
   * @template T - The expected response data type.
   * @param {string | URL} url - The URL to send the request to.
   * @param {unknown} data - The data to send in the request body.
   * @param {ClientConfig} [config] - Configuration for the request.
   * @returns {Promise<FetchResponse<T>>} A promise that resolves to the response.
   *
   * @example
   * client.post("/users", { name: "John Doe" }).then(response => {
   *   console.log(response.data); // => { id: 1, name: "John Doe" }
   * });
   */
  post = <T = unknown>(
    url: URL | string,
    data: unknown,
    config?: ClientConfig,
  ) => this.#sendRequest<T>(url, "POST", data, config);

  /**
   * Sends a PUT request to the specified URL with the given data.
   *
   * @template T - The expected response data type.
   * @param {string | URL} url - The URL to send the request to.
   * @param {unknown} data - The data to send in the request body.
   * @param {ClientConfig} [config] - Configuration for the request.
   * @returns {Promise<FetchResponse<T>>} A promise that resolves to the response.
   *
   * @example
   * client.put("/users/1", { name: "Jane Doe" }).then(response => {
   *   console.log(response.data); // => { id: 1, name: "Jane Doe" }
   * });
   */
  put = <T = unknown>(
    url: URL | string,
    data: unknown,
    config?: ClientConfig,
  ) => this.#sendRequest<T>(url, "POST", data, config);

  /**
   * Sends a DELETE request to the specified URL.
   *
   * @template T - The expected response data type.
   * @param {string | URL} url - The URL to send the request to.
   * @param {ClientConfig} [config] - Configuration for the request.
   * @returns {Promise<FetchResponse<T>>} A promise that resolves to the response.
   *
   * @example
   * client.delete("/users/1").then(response => {
   *   console.log(response.status); // => 204
   * });
   */
  delete = <T = unknown>(url: URL | string, config?: ClientConfig) =>
    this.#sendRequest<T>(url, "POST", null, config);

  #sendRequest = async <T>(
    url: URL | string,
    method: Method,
    data: unknown,
    config?: ClientConfig,
  ) => {
    await this.#mergeConfigs(config);

    const requestUrl = this.#getUrl(url);

    requestUrl.search = this.#getRequestParams(requestUrl.search).toString();

    const body = this.#getBody(data);
    const headers = this.#getRequestHeaders(data);
    const fetchOptions = this.#getFetchOptions();

    const requestInfo = {
      ...fetchOptions,
      method,
      body,
      headers,
    };

    const response = await fetch(requestUrl, requestInfo);

    return this.#getResponse<T>(response, { url: requestUrl, ...requestInfo });
  };

  #mergeConfigs = async (config?: ClientConfig) => {
    let modifiedOptions = { ...this.initConfig, ...config };

    for (const request of this.interceptors.requests) {
      // eslint-disable-next-line no-await-in-loop
      modifiedOptions = await request.onFulfilled(modifiedOptions);

      if (!modifiedOptions) {
        throw request.onRejected?.(new Error("Request canceled"));
      }
    }

    this.currentConfig = modifiedOptions;
  };

  #getInterceptorResponse = async <T>(reponse: FetchResponse<T>) => {
    let modifiedResponse = { ...reponse };

    for (const response of this.interceptors.responses) {
      // eslint-disable-next-line no-await-in-loop
      modifiedResponse = await response.onFulfilled(modifiedResponse);

      if (!modifiedResponse) {
        throw response.onRejected?.(new Error("Request canceled"));
      }
    }

    return modifiedResponse;
  };

  #getFetchOptions = () => {
    const { baseURL, params, responseType, ...fetchOptions } =
      this.currentConfig;

    return fetchOptions;
  };

  #getUrl = (url: URL | string) => {
    const regex = /^https?:\/\//;

    if (url instanceof URL) {
      return url;
    }

    if (regex.test(url)) {
      return new URL(url);
    }

    const result = new URL(this.currentConfig.baseURL);

    const [newPathname, newQuery] = result.pathname
      .split("/")
      .concat(url.split("/"))
      .filter(Boolean)
      .join("/")
      .split("?");

    result.pathname = newPathname;

    if (newQuery) {
      result.search = `?${newQuery}`;
    }

    return result;
  };

  #getRequestParams = (queryParams?: string) => {
    const defaultUrlParams = this.#getUrlParams(this.currentConfig.params);
    const queryUrlParams = new URLSearchParams(queryParams);
    const result = new URLSearchParams();

    for (const [key, value] of [...queryUrlParams, ...defaultUrlParams]) {
      if (value !== "undefined") {
        result.set(key, value);
      }
    }

    return result;
  };

  #getUrlParams = (params?: Params) => {
    if (!params) {
      return new URLSearchParams();
    }

    const result = new Map<string, string>();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        result.set(key, value.join(","));

        return;
      }

      if (typeof value !== "undefined") {
        result.set(key, value?.toString() ?? "null");
      }
    });

    return new URLSearchParams([...result]);
  };

  #getBody = (data?: unknown) => {
    if (!data) {
      return null;
    }

    if (isXMLHttpRequestBodyInit(data)) {
      return data;
    }

    if (typeof data === "object") {
      return JSON.stringify(data);
    }

    throw new Error(
      `The data must be of XMLHttpRequestBodyInit type. Received ${typeof data}`,
    );
  };

  #getRequestHeaders = (data: unknown) => {
    const headers = new Headers(this.currentConfig.headers);

    if (!data) {
      return headers;
    }

    if (isBlob(data) || isFormData(data)) {
      // set content type automatically
      return headers;
    }

    if (isArrayBuffer(data)) {
      headers.set("content-type", "application/x-www-form-urlencoded");
    }

    if (typeof data === "object") {
      headers.set("content-type", "application/json");
    }

    return headers;
  };

  #getResponseData = (response: Response) => {
    switch (this.currentConfig.responseType) {
      case "json":
        return response.json();
      case "arrayBuffer":
        return response.arrayBuffer();
      case "blob":
        return response.blob();
      case "formData":
        return response.formData();
      case "stream":
        return response;
      case "text":
        return response.text();
      default:
        return response.text();
    }
  };

  #getResponse = async <T>(response: Response, request: FetchRequestInfo) => {
    const data = (await this.#getResponseData(response)) as T;

    const {
      headers,
      url,
      body,
      bodyUsed,
      status,
      ok,
      redirected,
      statusText,
      type,
    } = response;

    const fetchResponse: FetchResponse<T> = {
      headers,
      url,
      body,
      bodyUsed,
      status,
      ok,
      redirected,
      statusText,
      type,
      data,
    };

    if (status >= 300) {
      const message = "";

      throw new FetchError(message, status, statusText, request, fetchResponse);
    }

    const modifiedResponse = await this.#getInterceptorResponse(fetchResponse);

    return modifiedResponse;
  };
}

export { FetchClient };
