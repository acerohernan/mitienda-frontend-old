import { withoutAuthentication } from "../utils/server/ssr";
import LoginView from "../views/auth/login";

function Login() {
  return <LoginView />;
}

export const getServerSideProps = withoutAuthentication(async function ({
  req,
  res,
}) {
  return {
    props: {},
  };
});

export default Login;
