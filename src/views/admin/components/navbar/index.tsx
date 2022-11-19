import Link from "next/link";
import { AiOutlineHome, AiTwotoneHome } from "react-icons/ai";
import { BsFillNutFill, BsNut } from "react-icons/bs";
import { FaRegUser, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi";
import { MdDeliveryDining, MdOutlineDeliveryDining } from "react-icons/md";
import MobileNavbar from "./mobile";

export interface INavItem {
  label: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  path: string;
}

const NavBarItems: Array<INavItem> = [
  {
    label: "Inicio",
    icon: <AiOutlineHome className="w-6 h-6" />,
    activeIcon: <AiTwotoneHome className="w-6 h-6" />,
    path: "/admin",
  },
  {
    label: "Mis Pedidos",
    icon: <MdOutlineDeliveryDining className="w-6 h-6" />,
    activeIcon: <MdDeliveryDining className="w-6 h-6" />,
    path: "/admin/orders",
  },
  {
    label: "Mis productos",
    icon: <HiOutlineShoppingBag className="w-6 h-6" />,
    activeIcon: <HiShoppingBag className="w-6 h-6" />,
    path: "/admin/products",
  },
  {
    label: "Configuración",
    icon: <BsNut className="w-6 h-6" />,
    activeIcon: <BsFillNutFill className="w-6 h-6" />,
    path: "/admin/config",
  },
  {
    label: "Profile",
    icon: <FaRegUser className="w-6 h-6" />,
    activeIcon: <FaUser className="w-6 h-6" />,
    path: "/admin/profile",
  },
];

const AdminNavbar: React.FC = () => {
  return (
    <>
      <MobileNavbar items={NavBarItems} />
      <div className="hidden md:grid h-screen grid-rows-[64px_1fr_220px] bg-white fixed w-72 z-10">
        <div className="flex items-center px-8">
          <h1 className="text-3xl font-light">MiTienda</h1>
        </div>
        <div className="p-4 pt-0 border-r border-gray-200">
          {NavBarItems.map((item, index) => (
            <NavBarItem
              key={index}
              active={false}
              label={item.label}
              icon={item.icon}
              activeIcon={item.activeIcon}
              path={item.path}
            />
          ))}
        </div>
        <div className="border-t-2 p-5 px-8 grid grid-rows-[1fr_50px] border-r border-gray-200">
          <div>
            <span className="font-medium">Plan gratuito</span>
            <span className="font-light flex items-center justify-between text-sm mt-2">
              Ventas
              <span>0/21</span>
            </span>
            <div className="bg-purple-100 w-full h-4 rounded-lg mt-2" />
          </div>
          <button className="button-outline w-full text-sm">
            Mejorar plan
          </button>
        </div>
      </div>
    </>
  );
};

interface NavBarItemProps {
  label: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  active?: boolean;
  path: string;
}

const NavBarItem: React.FC<NavBarItemProps> = ({
  activeIcon,
  icon,
  label,
  active,
  path,
}) => {
  return (
    <Link
      className={`py-5 px-6 block hover:bg-gray-50 w-full rounded-lg ${
        active && "bg-gray-100"
      }`}
      href={path}
    >
      <div className="flex items-center">
        {active ? activeIcon : icon}
        <span className="ml-4 font-light">{label}</span>
      </div>
    </Link>
  );
};

export default AdminNavbar;
