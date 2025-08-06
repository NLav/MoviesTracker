import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";

import type { IMenuOption } from "@/shared/types";

type MenuProperties = {
  options: IMenuOption[];
};

function Menu({ options }: MenuProperties) {
  const [activeLinkIndicatorStyle, setActiveLinkIndicatorStyle] =
    useState<CSSProperties>({});
  const [currentHoverLink, setCurrentHoverLink] = useState<
    string | undefined
  >();

  const activeLinkReference = useRef<HTMLAnchorElement | null>(null);
  const location = useLocation();

  const currentPathname = location.pathname;

  const getLinkReference = useCallback(
    (link: string) => {
      if (currentPathname === link || currentHoverLink === link) {
        return activeLinkReference;
      }

      return;
    },
    [currentHoverLink, currentPathname]
  );

  useEffect(() => {
    const currentActiveLink = activeLinkReference.current;
    if (!currentActiveLink) return;

    const activeLinkRects = currentActiveLink.getClientRects()[0];

    console.log(activeLinkRects);

    setActiveLinkIndicatorStyle({
      top: activeLinkRects.bottom,
      left: activeLinkRects.left,
      width: activeLinkRects.width,
    });
  }, [currentPathname, currentHoverLink]);

  return (
    <div className="flex gap-4 p-6">
      <div
        className="bg-secondary-500 pointer-events-none fixed h-1 transition-all"
        style={activeLinkIndicatorStyle}
      ></div>
      {options.map((option) => {
        return (
          <Link
            key={option.label}
            ref={getLinkReference(option.link)}
            to={option.link}
            onMouseEnter={() => setCurrentHoverLink(option.link)}
            onMouseLeave={() => setCurrentHoverLink(undefined)}
          >
            {option.label}
          </Link>
        );
      })}
      {String(currentPathname)} {String(currentHoverLink)}
    </div>
  );
}

export { Menu };
