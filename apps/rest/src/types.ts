export type ResultOptions = {
  data?: unknown;
  statusCode?: number;
  status?: boolean;
};

export type ResponseResults = Required<ResultOptions>;

export interface RequestBody<T = unknown> {
  data: T;
}
