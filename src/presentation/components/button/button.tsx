import type { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type ButtonProperties = {
  children: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["children"]>;
  variant: NonNullable<ButtonVariants["variant"]>;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick">;

type ButtonVariants = VariantProps<typeof buttonStyles>;

const buttonStyles = tv({
  base: "cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-30",
  variants: {
    variant: {
      none: "not-disabled:hover:brightness-500",
      primary:
        "bg-primary border-secondary not-disabled:hover:bg-primary-500 rounded-full border px-2 py-1",
    },
  },
});

function Button({ children, disabled, onClick, variant }: ButtonProperties) {
  return (
    <button
      className={buttonStyles({ variant })}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export { Button };
