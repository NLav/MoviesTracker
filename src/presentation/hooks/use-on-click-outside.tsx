import type { RefObject } from "react";
import { useOnClickOutside as useOnClickOutsideUseHooks } from "usehooks-ts";

function useOnClickOutside(
  reference: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  action: (value: any) => any
) {
  return useOnClickOutsideUseHooks(
    reference as RefObject<HTMLElement> | RefObject<HTMLElement>[],
    action
  );
}

export { useOnClickOutside };
