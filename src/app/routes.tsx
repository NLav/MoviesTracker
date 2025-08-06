import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "@/presentation/layouts";
import { baseSubPath } from "@/shared/constants";

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
        path: "directors",
        children: [
          {
            index: true,
            element: <span>directors</span>,
          },
        ],
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
      {
        path: "movies",
        children: [
          {
            index: true,
            element: <span>movies</span>,
          },
        ],
      },
    ],
  },
]);

export { routes };
