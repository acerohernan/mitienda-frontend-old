import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import Button from "../../../../components/form/button";
import Select from "../../../../components/form/select";

const AdminConfigSocial: React.FC = () => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className="bg-white w-full shadow-md rounded-xl p-6">
      <div
        className=" text-start text-xl font-ligth flex items-center justify-between cursor-pointer text-purple-900"
        onClick={handleOpen}
      >
        Redes sociales
        {open ? (
          <CgChevronUp className="w-6 h-6 text-purple-900" />
        ) : (
          <CgChevronDown className="w-6 h-6 text-purple-900" />
        )}
      </div>
      {open ? (
        <div>
          <div className="w-full h-2 border-t border-gray-200 m-3 mx-auto" />
          <label className="text mb-2 inline-block " htmlFor="name">
            Nombre de la tienda
          </label>
          <input
            placeholder="Tienda Oficial"
            className="input text-sm"
            id="name"
          />
          <div className="mt-5" />
          <label className="text mb-2 inline-block ">Teléfono</label>
          <input placeholder="999113934" className="input text-sm" />
          <div className="mt-5" />
          <label className="text mb-2 inline-block ">Correo electrónico</label>
          <input placeholder="example@test.com" className="input text-sm" />
          <div className="mt-5" />
          <label className="text mb-2 inline-block ">Rubro de la tienda</label>
          <Select
            options={[
              {
                component: <>Supermercados y Mascotas</>,
                value: "Supermercados y Mascotas",
              },
              {
                component: <>Ropa y calzado</>,
                value: "Ropa y calzado",
              },
              {
                component: <>Gaming</>,
                value: "Gaming",
              },
            ]}
            onChange={(option) => console.log(option)}
            className="p-3"
          />
          <Button className="mt-5 w-full">Guardar cambios</Button>
        </div>
      ) : null}
    </div>
  );
};

export default AdminConfigSocial;
