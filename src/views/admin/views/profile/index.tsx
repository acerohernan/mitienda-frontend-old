import React from "react";
import { ITenant } from "../../../../context/admin/types";
import AdminProfileAccount from "./account";

interface Props {
  tenant: ITenant;
}

const AdminProfile: React.FC<Props> = ({ tenant }) => {
  console.log(tenant);
  return (
    <div className="p-4 bg-gray-100">
      <div className="grid gap-4">
        <AdminProfileAccount tenant={tenant} />
      </div>
    </div>
  );
};

export default AdminProfile;
