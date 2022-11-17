interface Props {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: Object;
  prefixComponent?: JSX.Element | JSX.Element[];
}

const TextInput: React.FC<Props> = ({
  error,
  label,
  className,
  inputProps,
  prefixComponent,
}) => {
  return (
    <div>
      {label ? (
        <label className="text-sm font-light mb-2 inline-block">{label}</label>
      ) : null}
      <div className="flex items-center">
        {prefixComponent ? prefixComponent : null}
        <input className={`input ${className}`} {...inputProps} />
      </div>
      {error ? <span className="input-err-msg text-sm">{error}</span> : null}
    </div>
  );
};

export default TextInput;
