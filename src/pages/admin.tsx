import { InferGetServerSidePropsType } from "next";
import { API } from "../api";
import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../utils/server/ssr";
import AdminView from "../views/admin";

function StoreAdmin({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return <AdminView />;
}

export default StoreAdmin;

export const getServerSideProps = withAuthentication(async (context) => {
  const token = getTokenInServerSide(context);

  try {
    const [tenant, store] = await Promise.all([
      API.tenant.getInformation(token),
      API.tenant.getStoreInformation(token),
    ]);

    return {
      props: {
        tenant: tenant.data.tenant,
        store: store.data.store,
      },
    };
  } catch (err: any) {
    console.log(err.message);
    removeTokenInServerSide(context);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
});
