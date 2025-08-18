import type { PaginationProperties } from "@/presentation/components";

type PaginationLimitChangerProperties = Pick<
  PaginationProperties,
  "handleChangeLimit"
>;

function PaginationLimitChanger({
  handleChangeLimit,
}: PaginationLimitChangerProperties) {
  return (
    <div className="bg-primary border-secondary rounded-md border-2 px-2 py-4">
      <input
        defaultValue={10}
        onChange={(event) => handleChangeLimit(Number(event.target.value))}
        type="number"
      />
    </div>
  );
}

export { PaginationLimitChanger };
