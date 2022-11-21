import Link from "next/link";
import { AiOutlineBell, AiOutlineEye } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <div className="bg-white p-6 py-2 absolute top-0 w-full flex items-center justify-between border-b border-gray-200">
      <div>
        <h1 className="text-3xl font-light md:hidden">MiTienda</h1>
      </div>
      <div className="flex items-center">
        <Link href="/nombre" target="_blank" className="hidden md:inline-block">
          <span className="font-light hover:underline">Ver tienda</span>
        </Link>
        <Link href="/nombre" target="_blank">
          <div className="p-3 transition-all hover:bg-gray-50 rounded-full">
            <AiOutlineEye className="w-6 h-6" />
          </div>
        </Link>
        <button className="mr-1">
          <div className="p-3 transition-all hover:bg-gray-50 rounded-full">
            <AiOutlineBell className="w-6 h-6" />
          </div>
        </button>
        <Link href="/admin/profile">
          <div className="p-2 transition-all  rounded-full border border-purple-600 hover:bg-purple-100">
            <FaUserAlt className="w-5 h-5 text-purple-700" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
