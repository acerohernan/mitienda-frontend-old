import {
  getTokenInServerSide,
  removeTokenInServerSide,
  withAuthentication,
} from "../../utils/server/ssr";
import AdminLayout from "../../views/admin/components/layout";
import AdminProducts from "../../views/admin/views/products";

function StoreAdmin() {
  return (
    <AdminLayout>
      <AdminProducts />
    </AdminLayout>
  );
}

export default StoreAdmin;
//Latest view
{
  /* <AdminProvider store={store} tenant={tenant}>
        <AdminView />
      </AdminProvider> */
}

export const getServerSideProps = withAuthentication(async (context) => {
  const token = getTokenInServerSide(context);
  console.log(token);

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
