import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import useClickOutsideAction from "../../hooks/useClickOutsideAction";

export interface Option {
  component: JSX.Element | JSX.Element[];
  value: any;
}

interface Props {
  options: Array<Option>;
  defaultOption?: Option;
  onChange: (option: Option) => void;
  className?: string;
}

function Select({ options, defaultOption, onChange, className }: Props) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useClickOutsideAction(() => {
    setOpen(false);
  });

  const [selectedOption, setSelectedOption] = useState<Option | null>(() => {
    if (defaultOption) {
      return defaultOption;
    }

    if (options.length > 0) {
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
    <div className="relative" ref={wrapperRef}>
      <button
        className={`border bg-white flex justify-between select ${
          open && "border-purple-700"
        } ${className}`}
        onClick={handleOpen}
        type="button"
      >
        <span>{selectedOption && selectedOption.component}</span>
        <div className="max-w-xs">
          {open ? (
            <CgChevronUp className="w-6 h-6 text-purple-800" />
          ) : (
            <CgChevronDown className="w-6 h-6" />
          )}
        </div>
      </button>
      {open && options.length > 0 ? (
        <div className="absolute bottom-100 w-full z-10 max-h-40 overflow-y-auto scrollbar-hide scroll-bar border-x border">
          {options.map((option, index) => {
            if (selectedOption && option.value === selectedOption?.value)
              return;

            return (
              <button
                type="button"
                className="block bg-white text-start font-light text-md hover:bg-gray-50 w-full text-sm transition-all border-b-white hover:border-b-purple-700 px-4 py-2"
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
