import { IAdminView } from "../..";

interface Props {
  views: Array<IAdminView>;
  selected: IAdminView;
  handleSelect: (view: IAdminView) => () => void;
}

const MobileNavbar: React.FC<Props> = ({ views, handleSelect, selected }) => {
  return (
    <div className="grid grid-cols-4 items-center justify-evenly bg-white md:hidden w-full fixed border bottom-0 z-10">
      {views.map((view, index) => (
        <MobileNavBarItem
          active={selected.label === view.label}
          activeIcon={view.activeIcon}
          icon={view.icon}
          onSelect={handleSelect(view)}
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
