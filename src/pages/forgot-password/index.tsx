import { withoutAuthentication } from "../../utils/server/ssr";
import ForgotPasswordView from "../../views/auth/forgot";

function ForgotPassword() {
  return <ForgotPasswordView />;
}

export const getServerSideProps = withoutAuthentication(async function ({
  req,
  res,
}) {
  return {
    props: {},
  };
});

export default ForgotPassword;
