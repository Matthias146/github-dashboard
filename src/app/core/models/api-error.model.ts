export type ApiErrorType = 'not_found' | 'forbidden' | 'rate_limit' | 'network' | 'unknown';

export interface ApiError {
  type: ApiErrorType;
  message: string;
  statusCode?: number;
}
