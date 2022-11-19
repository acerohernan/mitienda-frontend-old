import React from "react";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

import AdminHeader from "../header";
import AdminNavbar from "../navbar";

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-gray-100 h-screen grid md:grid-cols-[1fr]">
      <AdminNavbar />
      <div className="">
        <AdminHeader />
        <div className="mt-16 md:ml-72 mb-16 md:mb-0">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
