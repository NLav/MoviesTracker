import classNames from "classnames";

type SkeletonBlockProperties = {
  heightClassname: string;
  widthClassname: string;
  extraClassname?: string;
};

function SkeletonBlock({
  heightClassname,
  widthClassname,
  extraClassname,
}: SkeletonBlockProperties) {
  return (
    <span
      className={classNames(
        "rounded-md bg-neutral-50",
        heightClassname,
        widthClassname,
        extraClassname
      )}
    />
  );
}

export { SkeletonBlock };
