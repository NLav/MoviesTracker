import { createBrowserRouter, Navigate } from "react-router-dom";

import { makeMainLayout } from "@/main/factories/layouts";
import { makeGenreFormPage, makeGenrePage } from "@/main/factories/pages";
import { baseSubPath } from "@/shared/constants";

const router = createBrowserRouter([
  {
    path: baseSubPath,
    element: makeMainLayout(),
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
            element: makeGenrePage(),
          },
          {
            path: "new",
            element: makeGenreFormPage(),
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
