import LoaderSpinner from "./spinner";

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
  loading?: boolean;
  submit?: boolean;
}

const Button: React.FC<Props> = ({ children, className, loading, submit }) => {
  return (
    <button
      className={`button  ${className} flex items-center justify-center`}
      type={submit ? "submit" : "button"}
      disabled={loading}
    >
      {loading && <LoaderSpinner className="ml-2" />}
      <div className="inline-block mr-2">{children}</div>
    </button>
  );
};

export default Button;
