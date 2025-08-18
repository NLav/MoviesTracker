import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";

import { Button, type PaginationProperties } from "@/presentation/components";

type PaginationNavigatorProperties = Pick<
  PaginationProperties,
  "currentPage" | "handleChangePage" | "totalPages"
>;

const MAX_QUANTITY_AROUND_CURRENT = 4;

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

  let quantityBeforeCurrent = Math.min(
    quantityToStart,
    MAX_QUANTITY_AROUND_CURRENT
  );
  let quantityAfterCurrent = Math.min(
    quantityToEnd,
    MAX_QUANTITY_AROUND_CURRENT
  );

  if (
    quantityBeforeCurrent + quantityAfterCurrent <
    MAX_QUANTITY_AROUND_CURRENT * 2
  ) {
    if (quantityBeforeCurrent < quantityAfterCurrent) {
      const missingInBefore =
        MAX_QUANTITY_AROUND_CURRENT - quantityBeforeCurrent;

      quantityAfterCurrent = Math.min(
        quantityAfterCurrent + missingInBefore,
        quantityToEnd
      );
    } else {
      const missingInAfter = MAX_QUANTITY_AROUND_CURRENT - quantityAfterCurrent;

      quantityBeforeCurrent = Math.min(
        quantityBeforeCurrent + missingInAfter,
        quantityToStart
      );
    }
  }

  const beforeCurrentNumbers = Array.from({
    length: quantityBeforeCurrent,
  }).map((_, index, array) => index + currentPage - array.length);

  const afterCurrentNumbers = Array.from({
    length: quantityAfterCurrent,
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

      <div className="flex items-center gap-2">
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

        <span className={numberStyle({ current: true })}>{currentPage}</span>

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
