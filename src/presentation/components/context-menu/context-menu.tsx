import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import type { JSX } from "react";
import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { Button } from "@/presentation/components";
import { useOnClickOutside } from "@/presentation/hooks";

type ContextMenuItem = {
  label: string;
  action: () => void;
  variant?: ContextMenuItemVariants;
};

type ContextMenuProperties = {
  icon?: JSX.Element;
  items: ContextMenuItem[];
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const contextMenuItemStyle = tv({
  base: "cursor-pointer p-1 text-start transition first:rounded-t-md last:rounded-b-md",
  variants: {
    variant: {
      default: "hover:bg-neutral-300 dark:hover:bg-neutral-700",
      red: "text-red-700 hover:bg-red-300 dark:text-red-300 dark:hover:bg-red-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ContextMenuItemVariants = NonNullable<
  VariantProps<typeof contextMenuItemStyle>
>["variant"];

function ContextMenu({ className, icon, items }: ContextMenuProperties) {
  const [showItemList, setShowItemList] = useState(false);
  const [itemListPosition, setItemListPosition] = useState<CSSProperties>({});

  const buttonReference = useRef<HTMLButtonElement>(null);
  const itemListReference = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonReference, itemListReference], () => {
    setShowItemList(false);
  });

  useEffect(() => {
    const currentButtonReference = buttonReference?.current;
    const currentItemListReference = itemListReference?.current;

    if (!currentButtonReference || !currentItemListReference) return;

    const clientButtonRects = currentButtonReference.getClientRects()[0];
    const clientItemListRects = currentItemListReference.getClientRects()[0];

    const style: CSSProperties = {};

    style.top = `${clientButtonRects.bottom}px`;
    style.left = `${clientButtonRects.left + clientButtonRects.width / 2 - clientItemListRects.width}px`;

    setItemListPosition(style);
  }, [showItemList]);

  return (
    <>
      <Button
        className={className}
        onClick={() => {
          setShowItemList(!showItemList);
        }}
        ref={buttonReference}
        variant="none"
      >
        {icon ?? <DotsThreeVerticalIcon size={24} />}
      </Button>

      {showItemList ? (
        <div
          className="fixed flex flex-col gap-0.5 rounded-lg border-2 border-neutral-900 bg-neutral-100 shadow-md shadow-neutral-500 dark:border-neutral-100 dark:bg-neutral-900"
          ref={itemListReference}
          style={itemListPosition}
        >
          {items.map((item, index) => (
            <Fragment key={item.label}>
              <button
                className={contextMenuItemStyle({
                  variant: item.variant,
                })}
                key={item.label}
                onClick={() => item.action()}
                type="button"
              >
                {item.label}
              </button>

              {items.length - 1 !== index && (
                <span className="h-[1px] w-full bg-neutral-500" />
              )}
            </Fragment>
          ))}
        </div>
      ) : undefined}
    </>
  );
}

export { ContextMenu };
