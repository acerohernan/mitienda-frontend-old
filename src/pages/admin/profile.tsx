import { InferGetServerSidePropsType } from "next";
import { API } from "../../api";
import { ITenant } from "../../context/admin/types";
import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../../utils/server/ssr";
import AdminLayout from "../../views/admin/components/layout";
import AdminProfile from "../../views/admin/views/profile";

function StoreAdmin({
  tenant,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AdminLayout>
      <AdminProfile tenant={tenant} />
    </AdminLayout>
  );
}

export default StoreAdmin;

export const getServerSideProps = withAuthentication<{ tenant: ITenant }>(
  async (context) => {
    const token = getTokenInServerSide(context);

    try {
      const response = await API.tenant.getInformation(token);
      return {
        props: {
          tenant: response.data.tenant,
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
  }
);
