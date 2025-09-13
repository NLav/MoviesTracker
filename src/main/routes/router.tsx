import { createBrowserRouter, Navigate } from "react-router-dom";

import { MakeMainLayout } from "@/main/factories/layouts";
import { MakeGenreFormPage, MakeGenrePage } from "@/main/factories/pages";
import { baseSubPath } from "@/shared/constants";

const router = createBrowserRouter([
  {
    path: baseSubPath,
    element: <MakeMainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={`${baseSubPath}/genres`} />,
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
        path: "genres",
        children: [
          {
            index: true,
            element: <MakeGenrePage />,
          },
          {
            path: "new",
            element: <MakeGenreFormPage />,
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

export { router };
