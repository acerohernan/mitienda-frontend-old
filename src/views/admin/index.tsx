import { useEffect, useState } from "react";
import { AiOutlineHome, AiTwotoneHome } from "react-icons/ai";
import { BsFillNutFill, BsNut } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi";
import { MdDeliveryDining, MdOutlineDeliveryDining } from "react-icons/md";
import AdminHeader from "./components/header";
import AdminNavbar from "./components/navbar";
import AdminConfig from "./views/config";
import AdminHome from "./views/home";
import AdminOrders from "./views/orders";
import AdminProducts from "./views/products";
import AdminProfile from "./views/profile";

export interface IAdminView {
  label: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  component: JSX.Element;
  path: string;
}

const VIEWS: Array<IAdminView> = [
  {
    label: "Inicio",
    component: <AdminHome />,
    icon: <AiOutlineHome className="w-6 h-6" />,
    activeIcon: <AiTwotoneHome className="w-6 h-6" />,
    path: "/admin",
  },
  {
    label: "Mis Pedidos",
    component: <AdminOrders />,
    icon: <MdOutlineDeliveryDining className="w-6 h-6" />,
    activeIcon: <MdDeliveryDining className="w-6 h-6" />,
    path: "/admin/orders",
  },
  {
    label: "Mis productos",
    component: <AdminProducts />,
    icon: <HiOutlineShoppingBag className="w-6 h-6" />,
    activeIcon: <HiShoppingBag className="w-6 h-6" />,
    path: "/admin/products",
  },
  {
    label: "Configuración",
    component: <AdminConfig />,
    icon: <BsNut className="w-6 h-6" />,
    activeIcon: <BsFillNutFill className="w-6 h-6" />,
    path: "/admin/config",
  },
  {
    label: "Profile",
    component: <AdminProfile />,
    icon: <FaRegUser className="w-6 h-6" />,
    activeIcon: <FaUser className="w-6 h-6" />,
    path: "/admin/profile",
  },
];

function AdminView() {
  const [view, setView] = useState<IAdminView>(VIEWS[0]);

  function handleView(view: IAdminView) {
    return () => {
      setView(view);
      localStorage.setItem("admin_view", JSON.stringify(view));
    };
  }

  useEffect(() => {
    const savedView: any = localStorage.getItem("admin_view");

    if (savedView) {
      const viewToSet = VIEWS.find(
        (view) => JSON.parse(savedView).label === view.label
      );

      if (viewToSet) setView(viewToSet as IAdminView);
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen grid md:grid-cols-[1fr]">
      <AdminNavbar />
      <div className="">
        <AdminHeader />
        <div className="mt-16 md:ml-72 mb-16 md:mb-0">{view.component}</div>
      </div>
    </div>
  );
}

export default AdminView;
