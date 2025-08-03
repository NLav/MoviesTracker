import { MainLayout } from "@/presentation/layouts";
import { baseSubPath } from "@/shared/constants";
import { createBrowserRouter, Navigate } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: baseSubPath,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={`${baseSubPath}/genders`} />,
      },
      {
        path: "genders",
        children: [
          {
            index: true,
            element: <span>genders</span>,
          },
        ],
      },
    ],
  },
]);

export { routes };
