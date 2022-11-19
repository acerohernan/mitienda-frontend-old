import { InferGetServerSidePropsType } from "next";
import { API } from "../../api";
import { IStore } from "../../context/admin/types";
import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../../utils/server/ssr";
import AdminLayout from "../../views/admin/components/layout";
import AdminConfigView from "../../views/admin/views/config";

function AdminConfig({
  store,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AdminLayout>
      <AdminConfigView store={store} />
    </AdminLayout>
  );
}

export default AdminConfig;

export const getServerSideProps = withAuthentication<{
  store: IStore;
}>(async (context) => {
  const token = getTokenInServerSide(context);

  try {
    const [store, social] = await Promise.all([
      API.tenant.getStoreInformation(token),
      API.tenant.getStoreSocialInformation(token),
    ]);

    return {
      props: {
        store: { ...store.data.store, social: social.data.social },
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
