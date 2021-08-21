export interface ResponseData<T = unknown> {
  status: boolean;
  statusCode: number;
  data: T;
}
