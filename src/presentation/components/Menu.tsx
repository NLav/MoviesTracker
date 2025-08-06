import { useNavigate } from "react-router-dom";

import type { IMenuOption } from "./IMenu";

type MenuProperties = {
  options: IMenuOption[];
};

function Menu({ options }: MenuProperties) {
  const navigate = useNavigate();

  return (
    <div className="bg-primary-500 h-16 rounded-b-full shadow-md shadow-neutral-500">
      {options.map((option) => (
        <button key={option.label} onClick={() => navigate(option.link)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export { Menu };
