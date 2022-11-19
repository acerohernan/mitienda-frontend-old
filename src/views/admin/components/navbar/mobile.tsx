import Link from "next/link";
import { INavItem } from ".";

interface Props {
  items: INavItem[];
}

const MobileNavbar: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-5 items-center justify-evenly bg-white md:hidden w-full fixed border bottom-0 z-10">
      {items.map((item, index) => (
        <MobileNavBarItem
          active={false}
          activeIcon={item.activeIcon}
          icon={item.icon}
          path={item.path}
          key={index}
        />
      ))}
    </div>
  );
};

interface MobileNavBarItemProps {
  active: boolean;
  activeIcon: JSX.Element;
  icon: JSX.Element;
  path: string;
}
const MobileNavBarItem: React.FC<MobileNavBarItemProps> = ({
  icon,
  activeIcon,
  active,
  path,
}) => {
  return (
    <Link
      className="grid justify-center w-full hover:bg-gray-50 py-4"
      href={path}
    >
      {active ? activeIcon : icon}
      <div
        className={`rounded-full mt-1 w-1 h-1 mx-auto ${
          active ? "bg-black" : "bg-white"
        }`}
      />
    </Link>
  );
};

export default MobileNavbar;
