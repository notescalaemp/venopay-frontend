import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants';
import { PaginatedResponse } from '../types';

/**
 * Calculate pagination offset
 */
export function getPaginationOffset(page: number, pageSize: number): number {
  return (Math.max(page, 1) - 1) * pageSize;
}

/**
 * Build paginated response
 */
export function buildPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE,
): PaginatedResponse<T> {
  const validPageSize = Math.min(pageSize, MAX_PAGE_SIZE);
  const validPage = Math.max(page, 1);
  const totalPages = Math.ceil(total / validPageSize);

  return {
    data,
    total,
    page: validPage,
    pageSize: validPageSize,
    totalPages,
    hasNextPage: validPage < totalPages,
    hasPreviousPage: validPage > 1,
  };
}
