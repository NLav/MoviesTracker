import { PaginationLimitChanger, PaginationNavigator } from "./components";

export type PaginationProperties = {
  currentPage: number;
  totalPages: number;
  handleChangeLimit: (newLimit: number) => void;
  handleChangePage: (newPage: number) => void;
};

function Pagination({
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

      <PaginationLimitChanger handleChangeLimit={handleChangeLimit} />
    </div>
  );
}

export { Pagination };
