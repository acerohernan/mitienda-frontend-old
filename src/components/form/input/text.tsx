interface Props {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: Object;
  prefixComponent?: JSX.Element | JSX.Element[];
  textarea?: boolean;
}

const TextInput: React.FC<Props> = ({
  error,
  label,
  className,
  inputProps,
  prefixComponent,
  textarea,
}) => {
  return (
    <div>
      {label ? (
        <label className="text-sm font-light mb-2 inline-block">{label}</label>
      ) : null}
      <div className="flex items-center">
        {prefixComponent ? prefixComponent : null}
        {textarea ? (
          <textarea className={`input ${className}`} {...inputProps} />
        ) : (
          <input className={`input ${className}`} {...inputProps} />
        )}
      </div>
      {error ? <span className="input-err-msg text-sm">{error}</span> : null}
    </div>
  );
};

export default TextInput;
