import { InvalidValueError } from "@/domain/errors";

export function isValidDate(value: any) {
  return !Number.isNaN(new Date(value).getDate());
}

export function formatDate(value: any) {
  if (!isValidDate(value)) throw new InvalidValueError();

  const valueDate = new Date(value);

  const day = valueDate.getUTCDate();
  const month = valueDate.getUTCMonth();
  const year = valueDate.getUTCFullYear();

  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedYear = String(year).padStart(4, "0");

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}
