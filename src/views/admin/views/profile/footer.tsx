import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { IoIosLogOut } from "react-icons/io";
import { API } from "../../../../api";

const AdminProfileFooter = () => {
  const { push } = useRouter();

  async function handleLogout() {
    try {
      await API.tenant.logout();
    } catch (err) {
      /* If the endpoint fails */
      Cookies.remove("token");
    }
    push("/login");
  }

  return (
    <button
      className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 w-52 mx-auto flex items-center justify-center hover:bg-gray-50"
      onClick={handleLogout}
    >
      <IoIosLogOut className="text-red-500 w-6 h-6 mr-2" />
      <span className="text-red-500">Cerrar sessión</span>
    </button>
  );
};

export default AdminProfileFooter;
