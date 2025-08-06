import { Outlet } from "react-router-dom";
import { Menu } from "@/presentation/components";

function MainLayout() {
  return (
    <div className="h-screen w-screen">
      <Menu
        options={[
          {
            label: "Filmes",
            link: "/movies",
          },
          {
            label: "Gêneros",
            link: "/genders",
          },
          {
            label: "Diretores",
            link: "/directors",
          },
        ]}
      />

      <span>
        <Outlet />
      </span>
    </div>
  );
}

export { MainLayout };
