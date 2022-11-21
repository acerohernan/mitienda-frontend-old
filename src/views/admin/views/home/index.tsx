const AdminHome: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="font-light text-2xl">
        Hola <span className="font-medium">Hernan!</span>
      </h1>
      <p className="font-light mt-2 text-lg">
        Te mostramos el resumen de novimembre
      </p>
      <div className="grid gap-4 mt-4">
        {/* <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6">
          <span className="">Visitas a tu web</span>
          <span className="">10</span>
        </div> */}
        <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6 grid grid-cols-[2fr_1fr] gap-4 items-center">
          <div className="flex items-center justify-evenly">
            <span className="text-3xl flex flex-col items-center px-6 font-light">
              0
              <div className="w-7 mt-1 h-1 rounded-md bg-orange-200" />
            </span>
            <span className="font-light">Pedidos aceptados</span>
          </div>
          <div className="flex items-center justify-center border-l border-gray-300">
            <span className="text-lg">$0.00</span>
          </div>
        </div>
        <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6 grid grid-cols-[2fr_1fr] gap-4 items-center">
          <div className="flex items-center justify-evenly">
            <span className="text-3xl flex flex-col items-center px-6 font-light">
              0
              <div className="w-7 mt-1 h-1 rounded-md bg-orange-500" />
            </span>
            <span className="font-light">Pedidos aceptados</span>
          </div>
          <div className="flex items-center justify-center border-l border-gray-300">
            <span className="text-lg">$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
