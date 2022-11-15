import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

export interface Option {
  component: JSX.Element | JSX.Element[];
  value: any;
}

interface Props {
  options: Array<Option>;
  defaultOption?: Option;
  onChange: (option: Option) => void;
}

function Select({ options, defaultOption, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState<Option | null>(() => {
    if (defaultOption) {
      onChange(defaultOption);
      return defaultOption;
    }

    if (options.length > 0) {
      onChange(options[0]);
      return options[0];
    }

    return null;
  });

  function handleOpen() {
    setOpen(!open);
  }

  function handleOptionClick(option: Option) {
    return () => {
      onChange(option);
      setSelectedOption(option);
      setOpen(false);
    };
  }

  return (
    <div className="border-0 border-black relative">
      <button
        className={`border bg-white flex justify-between input ${
          open && "border-purple-700"
        }`}
        onClick={handleOpen}
        type="button"
      >
        <span>{selectedOption && selectedOption.component}</span>
        <div className="max-w-xs">
          {open ? (
            <CgChevronUp className="w-6 h-6 text-purple-700" />
          ) : (
            <CgChevronDown className="w-6 h-6 text-purple-700" />
          )}
        </div>
      </button>
      {open && options.length > 0 ? (
        <div className="absolute bottom-100 w-full z-10 p-1 max-h-40 overflow-y-auto scrollbar-hide scroll-bar">
          {options.map((option, index) => {
            if (selectedOption && option.value === selectedOption?.value)
              return;

            return (
              <button
                type="button"
                className="block text-center bg-white font-light hover:bg-gray-50 w-full py-1 transition-all border-b-white hover:border-b-purple-700"
                onClick={handleOptionClick(option)}
                key={index}
              >
                {option.component}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Select;
