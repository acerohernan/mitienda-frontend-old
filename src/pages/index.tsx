import { useTenantContext } from "../context/tenant";
import { withAuthentication } from "../utils/server/ssr";

export default function Home() {
  const {
    actions: { logout },
  } = useTenantContext();

  return (
    <div className="border">
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export const getServerSideProps = withAuthentication((context) => {
  return {
    props: {},
  };
});
