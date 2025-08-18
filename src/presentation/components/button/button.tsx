import type { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type ButtonProperties = {
  children: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["children"]>;
  variant: NonNullable<ButtonVariants["variant"]>;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "onClick">;

type ButtonVariants = VariantProps<typeof buttonStyles>;

const buttonStyles = tv({
  base: "cursor-pointer transition not-disabled:hover:brightness-400 disabled:cursor-not-allowed disabled:opacity-30",
  variants: {
    variant: {
      none: "",
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
