import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";

type MenuOption = {
  label: string;
  link: string;
};

type MenuProperties = {
  options: MenuOption[];
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
      if (currentHoverLink && link !== currentHoverLink) {
        return;
      }

      if (link === currentHoverLink || link === currentPathname) {
        return activeLinkReference;
      }
    },
    [currentHoverLink, currentPathname]
  );

  useEffect(() => {
    const currentActiveLink = activeLinkReference.current;
    if (!currentActiveLink) return;

    const activeLinkRects = currentActiveLink.getClientRects()[0];

    setActiveLinkIndicatorStyle({
      top: activeLinkRects.bottom,
      left: activeLinkRects.left,
      width: activeLinkRects.width,
    });
  }, [currentPathname, currentHoverLink]);

  return (
    <div className="flex p-6">
      <div
        className="bg-secondary-500 pointer-events-none fixed h-1 transition-all"
        style={activeLinkIndicatorStyle}
      />

      {options.map((option) => {
        return (
          <Link
            className="px-2"
            key={option.label}
            onMouseEnter={() => setCurrentHoverLink(option.link)}
            onMouseLeave={() => setCurrentHoverLink(undefined)}
            ref={getLinkReference(option.link)}
            to={option.link}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}

export { Menu };
