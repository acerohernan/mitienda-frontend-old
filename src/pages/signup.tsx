import { withoutAuthentication } from "../utils/server/ssr";
import SignUpView from "../views/auth/signup";

function Signup() {
  return <SignUpView />;
}

export const getServerSideProps = withoutAuthentication((context) => {
  return {
    props: {},
  };
});

export default Signup;
