import { AiOutlineHome, AiTwotoneHome } from "react-icons/ai";
import { BsFillNutFill, BsNut } from "react-icons/bs";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi";
import { MdDeliveryDining, MdOutlineDeliveryDining } from "react-icons/md";
import { IAdminView } from "../..";

export interface INavItem {
  label: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
}

const ITEMS: Array<INavItem> = [
  {
    label: "Inicio",
    icon: <AiOutlineHome className="w-6 h-6" />,
    activeIcon: <AiTwotoneHome className="w-6 h-6" />,
  },
  {
    label: "Mis Pedidos",
    icon: <MdOutlineDeliveryDining className="w-6 h-6" />,
    activeIcon: <MdDeliveryDining className="w-6 h-6" />,
  },
  {
    label: "Mis productos",
    icon: <HiOutlineShoppingBag className="w-6 h-6" />,
    activeIcon: <HiShoppingBag className="w-6 h-6" />,
  },
  {
    label: "Configuración",
    icon: <BsNut className="w-6 h-6" />,
    activeIcon: <BsFillNutFill className="w-6 h-6" />,
  },
];

interface AdminNavBarProps {
  views: Array<IAdminView>;
  selectedView: IAdminView;
  handleView: (view: IAdminView) => () => void;
}

const AdminNavbar: React.FC<AdminNavBarProps> = ({
  views,
  handleView,
  selectedView,
}) => {
  return (
    <>
      {/* <MobileNavbar
        items={views}
        selected={viewSelected}
        handleSelect={handleView}
      /> */}
      <div className="hidden md:grid h-screen grid-rows-[64px_1fr_220px] bg-white">
        <div className="flex items-center px-8">
          <h1 className="text-3xl font-light">MiTienda</h1>
        </div>
        <div className="p-4 pt-0">
          {views.map((view, index) => (
            <NavBarItem
              key={index}
              active={selectedView.label === view.label}
              onClick={handleView(view)}
              label={view.label}
              icon={view.icon}
              activeIcon={view.activeIcon}
            />
          ))}
        </div>
        <div className="border-t-2 border-gray-100 p-5 px-8 grid grid-rows-[1fr_50px]">
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
  onClick: () => void;
}

const NavBarItem: React.FC<NavBarItemProps> = ({
  activeIcon,
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <button
      className={`py-5 px-6 hover:bg-gray-50 w-full rounded-lg ${
        active && "bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {active ? activeIcon : icon}
        <span className="ml-4 font-light">{label}</span>
      </div>
    </button>
  );
};

export default AdminNavbar;
