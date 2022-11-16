import { COUNTRIES } from "../../../constants";
import Select, { Option } from "../select";

interface Props {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: Object;
  onPrefixChange: (option: Option) => void;
}

const PhoneInput: React.FC<Props> = ({
  error,
  label,
  className,
  inputProps,
  onPrefixChange,
}) => {
  const options = COUNTRIES.map((country, index) => ({
    component: (
      <div className="flex items-center justify-center" key={index}>
        <img src={country.img_url} className="w-5 h-5" />
        <span className="ml-2">({country.prefix})</span>
      </div>
    ),
    value: country.prefix,
  }));

  return (
    <div>
      {label ? (
        <label className="text-sm mb-2 inline-block">{label}</label>
      ) : null}
      <div className="grid grid-cols-[110px_1fr] gap-1">
        <Select options={options} onChange={onPrefixChange} className="p-3" />
        <input className={`input ${className}`} {...inputProps} />
      </div>
      {error ? <span className="input-err-msg text-sm">{error}</span> : null}
    </div>
  );
};

export default PhoneInput;
