import { Outlet } from "react-router-dom";

import { Menu } from "@/presentation/components";

function MainLayout() {
  return (
    <div className="bg-primary flex h-screen w-screen flex-col">
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

      <span className="flex h-full overflow-auto rounded-t-4xl bg-neutral-100 p-8 shadow-inner shadow-neutral-500 dark:bg-neutral-900">
        <Outlet />
      </span>
    </div>
  );
}

export { MainLayout };
