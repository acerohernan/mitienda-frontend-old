interface Props {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: Object;
}

const TextInput: React.FC<Props> = ({
  error,
  label,
  className,
  inputProps,
}) => {
  return (
    <div>
      {label ? (
        <label className="text-sm mb-2 inline-block">{label}</label>
      ) : null}
      <input className={`input ${className}`} {...inputProps} />
      {error ? <span className="input-err-msg text-sm">{error}</span> : null}
    </div>
  );
};

export default TextInput;
