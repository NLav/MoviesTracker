export type PaginationParameters = {
  page: number;
  limit: number;
};

type PaginationMeta = {
  page: number;
  totalPages: number;
};

export type Pagination<T> = {
  items: T[];
  meta: PaginationMeta;
};
