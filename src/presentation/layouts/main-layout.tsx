import { Outlet } from "react-router-dom";

import { Menu } from "@/presentation/components";

function MainLayout() {
  return (
    <div className="bg-primary-500 h-screen w-screen">
      <Menu
        options={[
          {
            label: "Filmes",
            link: "/movies",
          },
          {
            label: "Gêneros",
            link: "/genres",
          },
          {
            label: "Diretores",
            link: "/directors",
          },
        ]}
      />

      <span className="flex h-full rounded-4xl bg-neutral-50 p-4 shadow-inner shadow-neutral-500">
        <Outlet />
      </span>
    </div>
  );
}

export { MainLayout };
