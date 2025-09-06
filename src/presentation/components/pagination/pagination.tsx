import { PaginationLimitSelector, PaginationNavigator } from "./components";

export type PaginationProperties = {
  currentLimit: number;
  currentPage: number;
  totalPages: number;
  handleChangeLimit: (newLimit: number) => void;
  handleChangePage: (newPage: number) => void;
};

function Pagination({
  currentLimit,
  currentPage,
  handleChangeLimit,
  handleChangePage,
  totalPages,
}: PaginationProperties) {
  return (
    <div className="flex justify-between">
      <PaginationNavigator
        currentPage={currentPage}
        handleChangePage={handleChangePage}
        totalPages={totalPages}
      />

      <PaginationLimitSelector
        currentLimit={currentLimit}
        handleChangeLimit={handleChangeLimit}
      />
    </div>
  );
}

export { Pagination };
