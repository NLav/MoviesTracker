type PaginationModes = "paginate" | "list";

type PaginationMeta = {
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type PaginationParameters = {
  page: number;
  mode: PaginationModes;
  limit: number;
};

export type Pagination<T> = {
  items: T[];
  meta: PaginationMeta;
};
