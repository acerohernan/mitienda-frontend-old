import React from "react";
import { IStore } from "../../../../context/admin/types";
import AdminConfigDesign from "./design";
import AdminConfigGeneral from "./general";
import AdminConfigSocial from "./social";

interface Props {
  store: IStore;
}

const AdminConfig: React.FC<Props> = ({ store }) => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="grid gap-4">
        <AdminConfigGeneral store={store} />
        <AdminConfigSocial store={store} />
        <AdminConfigDesign store={store} />
      </div>
    </div>
  );
};

export default AdminConfig;
