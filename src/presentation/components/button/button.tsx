import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type ButtonProperties = {
  children: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["children"]>;
  variant: ButtonVariants;
} & Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "disabled" | "onClick" | "type"
>;

type ButtonVariants = NonNullable<VariantProps<typeof buttonStyles>["variant"]>;

const buttonStyles = tv({
  base: "cursor-pointer transition disabled:cursor-not-allowed disabled:opacity-30",
  variants: {
    variant: {
      none: "not-disabled:hover:brightness-500",
      primary:
        "bg-primary border-secondary not-disabled:hover:bg-primary-500 rounded-full border-2 px-2 py-1",
      primaryOutlined:
        "border-primary not-disabled:hover:border-primary-500 rounded-full border-2 px-2 py-1",
    },
  },
});

function Button({
  children,
  className,
  disabled,
  onClick,
  type,
  variant,
}: ButtonProperties) {
  return (
    <button
      className={classNames(buttonStyles({ variant }), className)}
      disabled={disabled}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type ?? "button"}
    >
      {children}
    </button>
  );
}

export { Button };
