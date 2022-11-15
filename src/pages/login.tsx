import { NextPageContext } from "next";
import { publicRoute } from "../utils/server/publicRoute";
import LoginView from "../views/auth/login";

function Login() {
  return <LoginView />;
}

export async function getServerSideProps(context: NextPageContext) {
  publicRoute(context);

  return { props: {} };
}

export default Login;
