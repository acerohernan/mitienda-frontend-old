import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../../utils/server/ssr";
import AdminLayout from "../../views/admin/components/layout";
import AdminPricesView from "../../views/admin/views/prices";

function AdminPrices() {
  return (
    <AdminLayout>
      <AdminPricesView />
    </AdminLayout>
  );
}

export default AdminPrices;
//Latest view
{
  /* <AdminProvider store={store} tenant={tenant}>
          <AdminView />
        </AdminProvider> */
}

export const getServerSideProps = withAuthentication(async (context) => {
  const token = getTokenInServerSide(context);

  try {
    return {
      props: {},
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
