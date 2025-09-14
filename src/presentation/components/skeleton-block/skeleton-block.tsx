import classNames from "classnames";
import type { AllHTMLAttributes } from "react";

type SkeletonBlockProperties = {
  className: NonNullable<AllHTMLAttributes<HTMLDivElement>["className"]>;
};
function SkeletonBlock({ className }: SkeletonBlockProperties) {
  return (
    <span
      className={classNames(
        "animate-pulse rounded-md bg-neutral-500",
        className
      )}
    />
  );
}

export { SkeletonBlock };
