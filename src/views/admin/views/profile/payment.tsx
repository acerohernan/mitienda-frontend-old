import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { ITenant } from "../../../../context/admin/types";

interface Props {
  tenant: ITenant;
}

const AdminProfilePayment: React.FC<Props> = ({ tenant }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6">
      <div
        className=" text-start text-lg font-ligth flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Información de pago
        {open ? (
          <CgChevronUp className="w-6 h-6" />
        ) : (
          <CgChevronDown className="w-6 h-6" />
        )}
      </div>
      {open ? (
        <div>
          <div className="w-full h-2 border-t border-gray-200 m-3 mx-auto" />
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <span className="font-light text-sm">Plan</span>
              <span className="text-gray-600 text-sm">MiTienda PRO</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-light text-sm">Fecha de vencimiento</span>
              <span className="text-gray-600  text-sm">
                <>{tenant.expiration_date}</>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminProfilePayment;
