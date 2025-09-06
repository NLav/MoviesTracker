import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Toast, type ToastProperties } from "@/presentation/components";
import { toastTimeout } from "@/shared/constants";

type ToastContextValue = {
  toasts: ToastProperties[];
  addToast: (newToast: ToastProperties) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProperties & { id: string })[]>(
    []
  );

  const addToast = useCallback((newToast: ToastProperties) => {
    const id = String(new Date().getMilliseconds());

    setToasts((current) => [...current, { id, ...newToast }]);
    setTimeout(() => removeToast(id), toastTimeout);
  }, []);

  const removeToast = (id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const contextValue = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [addToast, toasts]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div className="fixed top-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };
