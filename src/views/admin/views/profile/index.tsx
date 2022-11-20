import React from "react";
import { ITenant } from "../../../../context/admin/types";
import AdminProfileAccount from "./account";
import AdminProfileFooter from "./footer";
import AdminProfileInformation from "./information";
import AdminProfilePayment from "./payment";

interface Props {
  tenant: ITenant;
}

const AdminProfile: React.FC<Props> = ({ tenant }) => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="grid gap-4">
        <AdminProfileAccount tenant={tenant} />
        <AdminProfileInformation tenant={tenant} />
        <AdminProfilePayment tenant={tenant} />
        <AdminProfileFooter />
      </div>
    </div>
  );
};

export default AdminProfile;
