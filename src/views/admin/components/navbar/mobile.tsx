import { INavItem } from ".";

interface Props {
  items: Array<INavItem>;
  selected: string;
  handleSelect: (option: string) => () => void;
}

const MobileNavbar: React.FC<Props> = ({ items, handleSelect, selected }) => {
  return (
    <div className="grid grid-cols-4 items-center justify-evenly bg-white md:hidden w-full absolute border bottom-0 z-10">
      {items.map((item) => (
        <MobileNavBarItem
          active={selected === item.label}
          activeIcon={item.activeIcon}
          icon={item.icon}
          onSelect={handleSelect(item.label)}
        />
      ))}
    </div>
  );
};

interface MobileNavBarItemProps {
  active: boolean;
  activeIcon: JSX.Element;
  icon: JSX.Element;
  onSelect: () => void;
}
const MobileNavBarItem: React.FC<MobileNavBarItemProps> = ({
  onSelect,
  icon,
  activeIcon,
  active,
}) => {
  return (
    <button
      onClick={onSelect}
      className="grid justify-center w-full hover:bg-gray-50 py-4"
    >
      {active ? activeIcon : icon}
      <div
        className={`rounded-full mt-1 w-1 h-1 mx-auto ${
          active ? "bg-black" : "bg-white"
        }`}
      />
    </button>
  );
};

export default MobileNavbar;
