import AdminConfigDesign from "./design";
import AdminConfigGeneral from "./general";
import AdminConfigSocial from "./social";

const AdminConfig = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="grid gap-4">
        <AdminConfigGeneral />
        <AdminConfigSocial />
        <AdminConfigDesign />
      </div>
    </div>
  );
};

export default AdminConfig;
