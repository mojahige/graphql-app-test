export interface ResponseResultOptions {
  data?: unknown;
  statusCode?: number;
  status?: boolean;
}

export type ResponseResults = Required<ResponseResultOptions>;

export interface RequestBody<T = unknown> {
  data: T;
}
