import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";

import { Button, type PaginationProperties } from "@/presentation/components";

type PaginationNavigatorProperties = Pick<
  PaginationProperties,
  "currentPage" | "handleChangePage" | "totalPages"
>;

const MAX_NUMBER_AROUND_CURRENT = 4;

const numbersContainerStyle = tv({
  base: "ml-auto flex w-full items-center gap-2",
  variants: {
    position: {
      before: "justify-end",
      after: "",
    },
  },
});

const numberStyle = tv({
  base: "flex cursor-pointer items-center justify-center rounded-md shadow-md shadow-neutral-500",
  variants: {
    current: {
      true: "bg-secondary size-10 min-w-10 text-2xl font-semibold",
      false: "bg-secondary-200 dark:bg-secondary-800 size-8",
    },
  },
});

function PaginationNavigator({
  currentPage,
  handleChangePage,
  totalPages,
}: PaginationNavigatorProperties) {
  const quantityToStart = currentPage - 1;
  const quantityToEnd = totalPages - currentPage;

  const beforeCurrentNumbers = Array.from({
    length: Math.min(quantityToStart, MAX_NUMBER_AROUND_CURRENT),
  }).map((_, index, array) => index + currentPage - array.length);

  const afterCurrentNumbers = Array.from({
    length: Math.min(quantityToEnd, MAX_NUMBER_AROUND_CURRENT),
  }).map((_, index) => index + 1 + currentPage);

  return (
    <div className="bg-primary border-secondary flex w-[468px] items-center justify-between gap-2 rounded-md border-2 px-2 py-4">
      <Button
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
        variant="none"
      >
        <CaretLeftIcon className="text-4xl" />
      </Button>

      <div className={numbersContainerStyle({ position: "before" })}>
        {beforeCurrentNumbers.map((number) => (
          <button
            className={numberStyle({ current: false })}
            key={number}
            onClick={() => handleChangePage(number)}
            type="button"
          >
            {number}
          </button>
        ))}
      </div>

      <span className={numberStyle({ current: true })}>{currentPage}</span>

      <div className={numbersContainerStyle({ position: "after" })}>
        {afterCurrentNumbers.map((number) => (
          <button
            className={numberStyle({ current: false })}
            key={number}
            onClick={() => handleChangePage(number)}
            type="button"
          >
            {number}
          </button>
        ))}
      </div>

      <Button
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
        variant="none"
      >
        <CaretRightIcon className="text-4xl" />
      </Button>
    </div>
  );
}

export { PaginationNavigator };
