import { SkeletonBlock } from "@/presentation/components";

function GenreCardSkeleton() {
  return (
    <div className="bg-primary border-secondary flex animate-pulse flex-col gap-2 rounded-lg border-2 p-4">
      <SkeletonBlock heightClassname="h-4" widthClassname="w-3/5" />

      <SkeletonBlock
        extraClassname="ml-auto"
        heightClassname="h-4"
        widthClassname="w-3/5"
      />
    </div>
  );
}

export { GenreCardSkeleton };
