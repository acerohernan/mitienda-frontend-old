import { InferGetServerSidePropsType } from "next";
import { API } from "../../api";
import { IStore } from "../../context/admin/types";
import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../../utils/server/ssr";
import AdminLayout from "../../views/admin/components/layout";
import AdminConfig from "../../views/admin/views/config";

function StoreAdmin({
  store,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AdminLayout>
      <AdminConfig store={store} />
    </AdminLayout>
  );
}

export default StoreAdmin;

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
