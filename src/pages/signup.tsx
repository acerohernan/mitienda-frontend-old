import { NextPageContext } from "next";
import { publicRoute } from "../utils/server/publicRoute";
import SignUpView from "../views/auth/signup";

function Signup() {
  return <SignUpView />;
}

export async function getServerSideProps(context: NextPageContext) {
  publicRoute(context);

  return { props: {} };
}
export default Signup;
