import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
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

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (newToast: ToastProperties) => {
      const id = String(new Date().getMilliseconds());

      setToasts((current) => [...current, { id, ...newToast }]);
      setTimeout(() => removeToast(id), toastTimeout);
    },
    [removeToast]
  );

  const contextValue = useMemo(
    () => ({ toasts, addToast, removeToast }),
    [addToast, removeToast, toasts]
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

function useToast() {
  const context = useContext(ToastContext);

  if (!context) throw new Error("useToast must be used within ToastProvider");

  return context.addToast;
}

// eslint-disable-next-line react-refresh/only-export-components
export { ToastContext, ToastProvider, useToast };
