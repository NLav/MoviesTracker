import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "@/presentation/components";
import { useOnClickOutside } from "@/presentation/hooks";

type Option = {
  label: string;
  value: string;
};

type DropdownProperties = {
  onChange: (option: Option) => void;
  options: Option[];
  title?: string;
  selectedOption: Option;
};

const DROPDOWN_OPTIONS_MARGIN = 4;

function Dropdown({
  onChange,
  options,
  title,
  selectedOption,
}: DropdownProperties) {
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({});
  const [localSearch, setLocalSearch] = useState<string>(selectedOption.label);
  const [showDropdownOptions, setShowDropdownOptions] =
    useState<boolean>(false);
  const [showEveryOption, setShowEveryOption] = useState<boolean>(true);

  const dropdownReference = useRef<HTMLDivElement>(null);
  const dropdownOptionsReference = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    return showEveryOption
      ? options
      : options.filter((option) => option.label.includes(localSearch));
  }, [localSearch, options, showEveryOption]);

  function handleChangeOption(option: Option) {
    setShowDropdownOptions(false);
    setLocalSearch(option.label);
    setShowEveryOption(true);
  }

  useOnClickOutside(dropdownOptionsReference, () =>
    setShowDropdownOptions(false)
  );

  useEffect(() => {
    const currentDropdown = dropdownReference.current;
    const currentDropdownOptions = dropdownOptionsReference.current;

    if (!currentDropdown || !currentDropdownOptions || !showDropdownOptions)
      return;

    const dropdownClientRect = currentDropdown.getBoundingClientRect();
    const dropdownOptionsClientRect =
      currentDropdownOptions.getBoundingClientRect();
    const styles: CSSProperties = {};

    const top =
      dropdownClientRect.bottom + window.scrollY + DROPDOWN_OPTIONS_MARGIN;
    const left = dropdownClientRect.left + window.scrollX;

    styles.top = `${top}px`;
    styles.left = `${left}px`;
    styles.width = `${dropdownClientRect.width}px`;

    if (top + dropdownOptionsClientRect.height > window.innerHeight) {
      styles.top = `${dropdownClientRect.top + window.scrollY - dropdownOptionsClientRect.height - DROPDOWN_OPTIONS_MARGIN}px`;
    }

    setDropdownStyle(styles);
  }, [localSearch, showDropdownOptions]);

  return (
    <div className="relative" ref={dropdownReference}>
      {title ? <label htmlFor={title}>{title}</label> : undefined}

      <div className="bg-secondary flex items-center gap-1 rounded-md">
        <input
          className="px-2 py-1 text-lg"
          id="label"
          onBlur={() => {
            setLocalSearch(selectedOption.label);
            setShowEveryOption(true);
          }}
          onChange={(event) => {
            setLocalSearch(event.target.value);
            setShowEveryOption(false);
          }}
          onFocus={() => setShowDropdownOptions(true)}
          value={localSearch}
        />

        <Button
          onClick={() => setShowDropdownOptions(!showDropdownOptions)}
          variant="none"
        >
          <CaretDownIcon className="text-primary" size={24} weight="bold" />
        </Button>
      </div>

      {showDropdownOptions ? (
        <div
          className="bg-secondary fixed max-h-36 overflow-auto rounded-md p-2"
          ref={dropdownOptionsReference}
          style={dropdownStyle}
        >
          <ul className="flex flex-col">
            {filteredOptions.length > 0
              ? filteredOptions.map((option) => (
                  <button
                    className="hover:bg-primary flex cursor-pointer rounded-md px-4 py-2 transition"
                    key={option.value}
                    onClick={() => {
                      onChange(option);
                      handleChangeOption(option);
                    }}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))
              : "Nenhuma opção encontrada"}
          </ul>
        </div>
      ) : undefined}
    </div>
  );
}

export { Dropdown };
