import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

interface Option {
  component: JSX.Element | JSX.Element[];
  value: any;
}

interface Props {
  options: Array<Option>;
  defaultOption?: Option;
}

function Select({ options, defaultOption }: Props) {
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState<Option | null>(() => {
    if (defaultOption) return defaultOption;

    if (options.length > 0) return options[0];

    return null;
  });

  function handleOpen() {
    setOpen(!open);
  }

  function handleOptionClick(option: Option) {
    return () => {
      setOpen(false);
      setSelectedOption(option);
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
          {options.map((option) => (
            <button
              type="button"
              className="block text-center bg-white font-light hover:bg-gray-50 w-full py-1 transition-all border-b-white hover:border-b-purple-700"
              onClick={handleOptionClick(option)}
            >
              {option.component}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Select;
