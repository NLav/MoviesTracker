import type { InputHTMLAttributes } from "react";

type InputProperties = {
  title?: string;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "disabled" | "onChange" | "placeholder" | "value"
>;

function Input({
  disabled,
  onChange,
  placeholder,
  title,
  value,
}: InputProperties) {
  return (
    <div>
      {title ? <label htmlFor={title}>{title}</label> : undefined}

      <input
        className="border-primary w-full rounded-lg border px-2 py-1 disabled:bg-neutral-200"
        disabled={disabled}
        id={title}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export { Input };
