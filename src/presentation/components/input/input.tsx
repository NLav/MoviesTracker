import { type InputHTMLAttributes, useCallback, useState } from "react";

import { SkeletonBlock } from "@/presentation/components";
import { useDebounceCallback } from "@/presentation/hooks";

type InputProperties = {
  delay?: number;
  errorMessage?: string;
  isLoading?: boolean;
  onChange: NonNullable<InputHTMLAttributes<HTMLInputElement>["onChange"]>;
  title?: string;
  value: InputHTMLAttributes<HTMLInputElement>["value"];
} & Pick<InputHTMLAttributes<HTMLInputElement>, "disabled" | "placeholder">;

function Input({
  delay,
  disabled,
  errorMessage,
  isLoading,
  onChange,
  placeholder,
  title,
  value,
}: InputProperties) {
  const [localValue, setLocalValue] = useState<InputProperties["value"]>(
    value ?? ""
  );

  const debouncedOnChange = useDebounceCallback(onChange, delay);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);

      if (delay) {
        debouncedOnChange(event);
      } else {
        onChange(event);
      }
    },
    [debouncedOnChange, delay, onChange]
  );

  return (
    <div className="flex flex-col">
      {title ? <label htmlFor={title}>{title}</label> : undefined}

      {isLoading ? (
        <SkeletonBlock className="h-9 w-full" />
      ) : (
        <input
          className="border-primary w-full rounded-lg border-2 px-2 py-1 disabled:cursor-not-allowed disabled:bg-neutral-200"
          disabled={disabled}
          id={title}
          onChange={handleChange}
          placeholder={placeholder}
          value={localValue}
        />
      )}

      {errorMessage ? (
        <span className="text-xs text-red-500">Campo obrigatório</span>
      ) : undefined}
    </div>
  );
}

export { Input };
