import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../../utils/server/ssr";
import AdminLayout from "../../views/admin/components/layout";
import AdminProductsView from "../../views/admin/views/products";

function AdminProducts() {
  return (
    <AdminLayout>
      <AdminProductsView />
    </AdminLayout>
  );
}

export default AdminProducts;
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
