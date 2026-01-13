/**
 * Paginated response type for list endpoints
 */
export type PaginatedResponse<T = any> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
