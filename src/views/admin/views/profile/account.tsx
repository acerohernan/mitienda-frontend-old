import Link from "next/link";
import { BsArrowRightShort, BsCheckLg } from "react-icons/bs";
import { ITenant } from "../../../../context/admin/types";

interface Props {
  tenant: ITenant;
}

const AdminProfileAccount: React.FC<Props> = ({ tenant }) => {
  return (
    <div className="text-center p-6 max-w-2xl mx-auto w-full">
      {tenant.name && tenant.surname ? (
        <h1 className="text-3xl mb-6">{`${tenant.name || ""} ${
          tenant.surname || ""
        }`}</h1>
      ) : null}

      <div>
        <div className="grid gap-4">
          <div className="border rounded-2xl bg-purple-600 p-6">
            <div className="flex justify-between">
              <div className="text-start ">
                <span className="text-lg font-light text-white block ">
                  Plan Actual
                </span>
                <span className="text-3xl block text-white">MiTienda PRO</span>
              </div>
              <div className="h-7 w-7 bg-green-500 rounded-full flex items-center justify-center">
                <BsCheckLg className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="border-t w-full h-1 my-2" />
            <div className="flex justify-end">
              <Link
                href="/admin/prices"
                className="text-white flex items-center mt-4 hover:underline"
              >
                Mejorar plan
                <BsArrowRightShort className="text-white w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileAccount;
