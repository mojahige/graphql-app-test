import type { ResultOptions, ResponseResults } from './types';

export function result({
  status = true,
  statusCode = 200,
  data = null,
}: ResultOptions): ResponseResults {
  return {
    status: status,
    statusCode: statusCode,
    data: data,
  };
}
