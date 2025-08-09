type PaginationModes = "paginate" | "list";

interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface IPaginationParameters {
  page: number;
  mode: PaginationModes;
  limit: number;
}

export interface IPagination<T> {
  items: T[];
  meta: IPaginationMeta;
}
