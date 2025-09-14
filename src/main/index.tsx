import "@/presentation/styles/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "@/data/store";
import { router } from "@/main/routes";
import { ToastProvider } from "@/presentation/contexts";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Provider>
  </StrictMode>
);
