import type { GlobalResponse } from "./global-response";

export interface PaginationResponse<T> {
  data: T[] | null;
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

interface UseInfinitePaginationOptions<TData> {
  queryKey: any[];
  fetcher: (
    params: PaginationParams,
  ) => Promise<GlobalResponse<PaginationResponse<TData>>>;
  pageSize?: number;
  sortBy?: string;
  isDescending?: boolean;
}
