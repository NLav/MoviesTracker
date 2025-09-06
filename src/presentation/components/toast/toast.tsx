import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { cloneElement, type JSX } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { toastTimeout } from "@/shared/constants";

export type ToastProperties = {
  message: string;
  variant: NonNullable<ToastVariants["variant"]>;
};

const toastStyles = tv({
  base: "flex h-20 w-70 animate-[toast_ease-in-out] items-center gap-2 rounded-md p-2 text-lg shadow-md shadow-neutral-500",
  variants: {
    variant: {
      success: "bg-green-400 dark:bg-green-600",
      error: "bg-red-400 dark:bg-red-600",
    },
  },
});

type ToastVariants = VariantProps<typeof toastStyles>;

const iconVariants: Record<ToastProperties["variant"], JSX.Element> = {
  success: <CheckCircleIcon />,
  error: <XCircleIcon />,
};

function Toast({ message, variant }: ToastProperties) {
  return (
    <div
      className={toastStyles({ variant })}
      style={{
        animationDuration: toastTimeout + "ms",
      }}
    >
      {cloneElement(iconVariants[variant], {
        size: 24,
      })}

      {message}
    </div>
  );
}

export { Toast };
