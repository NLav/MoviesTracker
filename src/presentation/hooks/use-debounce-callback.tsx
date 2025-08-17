import { useDebounceCallback as useDebounceCallbackUseHooks } from "usehooks-ts";

function useDebounceCallback(
  action: (value: any) => any,
  delay: number = 1000
) {
  return useDebounceCallbackUseHooks(action, delay);
}

export { useDebounceCallback };
