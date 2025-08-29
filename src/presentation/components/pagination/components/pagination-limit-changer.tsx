import { Dropdown, type PaginationProperties } from "@/presentation/components";

type PaginationLimitChangerProperties = Pick<
  PaginationProperties,
  "currentLimit" | "handleChangeLimit"
>;

const limitOptions = [
  { label: "4", value: "4" },
  { label: "8", value: "8" },
  { label: "12", value: "12" },
  { label: "16", value: "16" },
];

function PaginationLimitChanger({
  currentLimit,
  handleChangeLimit,
}: PaginationLimitChangerProperties) {
  return (
    <div className="bg-primary border-secondary rounded-md border-2 px-2 py-4">
      <Dropdown
        onChange={(option) => handleChangeLimit(Number(option.value))}
        options={limitOptions}
        selectedOption={{
          label: String(currentLimit),
          value: String(currentLimit),
        }}
        title="Limite por página"
      />
    </div>
  );
}

export { PaginationLimitChanger };
