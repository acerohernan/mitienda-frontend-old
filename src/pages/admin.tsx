import { InferGetServerSidePropsType } from "next";
import { API } from "../api";
import { AdminProvider } from "../context/admin/AdminContext";
import { IStore } from "../context/admin/types";
import { ITenant } from "../context/tenant/types";
import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../utils/server/ssr";
import AdminView from "../views/admin";

function StoreAdmin({
  store,
  tenant,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AdminProvider store={store} tenant={tenant}>
      <AdminView />
    </AdminProvider>
  );
}

export default StoreAdmin;

export const getServerSideProps = withAuthentication<{
  store: IStore;
  tenant: ITenant;
}>(async (context) => {
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