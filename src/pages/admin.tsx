import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { API } from "../api";
import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../utils/server/ssr";

function StoreAdmin({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { query } = useRouter();

  return <div>{query.store} admin</div>;
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
