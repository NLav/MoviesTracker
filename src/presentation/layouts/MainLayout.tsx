import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <span>
        <Outlet />
      </span>
    </div>
  );
}

export { MainLayout };
