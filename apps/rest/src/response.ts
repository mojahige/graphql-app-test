import type { ResponseResultOptions, ResponseResults } from './types';

export function result({
  statusCode = 200,
  data = null,
  status = true,
}: ResponseResultOptions): ResponseResults {
  return {
    statusCode,
    data,
    status,
  };
}
