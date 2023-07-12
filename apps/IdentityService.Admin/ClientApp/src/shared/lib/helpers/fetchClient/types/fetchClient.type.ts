export type ResponseType =
  | "arrayBuffer"
  | "blob"
  | "formData"
  | "json"
  | "stream"
  | "stream"
  | "text";

type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};

export type ParamsArray = (bigint | boolean | number | string)[];

export type Params = Record<
  string,
  ParamsArray | bigint | boolean | number | string | null | undefined
>;

type MutableResponse = Mutable<Response>;

export type FetchResponse<T = any> = Omit<
  MutableResponse,
  "arrayBuffer" | "blob" | "clone" | "formData" | "json" | "text"
> & {
  data: T;
};

export type FetchRequestInfo = RequestInit & {
  url: URL;
};

export type ClientConfig = Omit<RequestInit, "body" | "method"> & {
  baseURL: string;
  params?: Params;
  responseType?: ResponseType;
};

export type Method = "DELETE" | "GET" | "POST" | "PUT";

export const isFormData = (data: any): data is FormData =>
  data instanceof FormData;

export const isBlob = (data: any): data is Blob => data instanceof Blob;

export const isArrayBuffer = (data: any): data is ArrayBuffer =>
  data instanceof ArrayBuffer || ArrayBuffer.isView(data);

export const isXMLHttpRequestBodyInit = (
  data: any,
): data is XMLHttpRequestBodyInit =>
  data instanceof FormData ||
  data instanceof Blob ||
  data instanceof ArrayBuffer ||
  ArrayBuffer.isView(data) ||
  typeof data === "string";
