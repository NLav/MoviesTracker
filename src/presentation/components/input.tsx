import { type InputHTMLAttributes, useState } from "react";
import { type DebouncedState } from "usehooks-ts";

import { useDebounceCallback } from "@/presentation/hooks";

type InputProperties = {
  delay?: number;
  onChange: NonNullable<InputHTMLAttributes<HTMLInputElement>["onChange"]>;
  title?: string;
  value: InputHTMLAttributes<HTMLInputElement>["value"];
} & Pick<InputHTMLAttributes<HTMLInputElement>, "disabled" | "placeholder">;

function handleChange(
  event: React.ChangeEvent<HTMLInputElement>,
  delay: InputProperties["delay"],
  onChange: InputProperties["onChange"],
  debouncedOnChange: DebouncedState<React.ChangeEventHandler<HTMLInputElement>>,
  setLocalValue: React.Dispatch<React.SetStateAction<InputProperties["value"]>>
) {
  setLocalValue(event.target.value);

  if (delay) {
    debouncedOnChange(event);
  } else {
    onChange(event);
  }
}

function Input({
  delay,
  disabled,
  onChange,
  placeholder,
  title,
  value,
}: InputProperties) {
  const [localValue, setLocalValue] = useState<InputProperties["value"]>(value);

  const debouncedOnChange = useDebounceCallback(onChange, delay);

  return (
    <div>
      {title ? <label htmlFor={title}>{title}</label> : undefined}

      <input
        className="border-primary w-full rounded-lg border px-2 py-1 disabled:bg-neutral-200"
        disabled={disabled}
        id={title}
        onChange={(event) =>
          handleChange(event, delay, onChange, debouncedOnChange, setLocalValue)
        }
        placeholder={placeholder}
        value={localValue}
      />
    </div>
  );
}

export { Input };
