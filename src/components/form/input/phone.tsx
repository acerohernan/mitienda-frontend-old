import React, { useState } from "react";
import { COUNTRIES } from "../../../constants";
import Select, { Option } from "../select";

interface Props {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: Object;
  selectedPrefix: string;
  onPrefixChange: (prefix: string) => void;
}

const PhoneInput: React.FC<Props> = ({
  error,
  label,
  className,
  inputProps,
  selectedPrefix,
  onPrefixChange,
}) => {
  const prefixes = COUNTRIES.map((country, index) => ({
    component: (
      <div className="flex items-center justify-center" key={index}>
        <img src={country.img_url} className="w-4 h-4" />
        <span className="ml-2">({country.prefix})</span>
      </div>
    ),
    value: country.prefix,
  }));

  const [selected, setselected] = useState<Option>(() => {
    let prefix;

    prefix = prefixes.find((prefix) => prefix.value === selectedPrefix);

    if (!prefix) prefix = prefixes[0];

    return prefix;
  });

  return (
    <div>
      {label ? (
        <label className="text-sm font-light mb-2 inline-block">{label}</label>
      ) : null}
      <div className="grid grid-cols-[110px_1fr] gap-1">
        <Select
          options={prefixes}
          onChange={(prefix) => {
            onPrefixChange(prefix.value);
          }}
          className="p-3 text-sm"
          defaultOption={selected}
        />
        <input className={`input ${className}`} {...inputProps} />
      </div>
      {error ? <span className="input-err-msg text-sm">{error}</span> : null}
    </div>
  );
};

export default PhoneInput;
