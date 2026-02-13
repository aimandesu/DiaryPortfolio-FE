export interface ApiError {
  code: string;
  description: string;
}

export interface GlobalResponse<T> {
  result: T | null;
  error: ApiError | null;
}
