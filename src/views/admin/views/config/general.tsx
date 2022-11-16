import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import Button from "../../../../components/form/button";
import PhoneInput from "../../../../components/form/input/phone";
import TextInput from "../../../../components/form/input/text";
import Select from "../../../../components/form/select";
import { useAdminContext } from "../../../../context/admin/hooks";
import { onlyNumbersRegex } from "../../../../utils/regex";

interface UpdateStoreFormValues {
  name: string;
  phone: string;
  phonePrefix: string;
  whatsapp: string;
  whatsappPrefix: string;
  category: string;
}

const AdminConfigGeneral: React.FC = () => {
  const [open, setOpen] = useState(false);

  const {
    state: { tenant },
  } = useAdminContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateStoreFormValues>();

  function onSubmit(data: UpdateStoreFormValues) {
    console.log(data);
  }

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className="bg-white w-full shadow-md rounded-xl p-6">
      <div
        className=" text-start text-xl font-ligth flex items-center justify-between cursor-pointer text-purple-900"
        onClick={handleOpen}
      >
        Información general
        {open ? (
          <CgChevronUp className="w-6 h-6 text-purple-900" />
        ) : (
          <CgChevronDown className="w-6 h-6 text-purple-900" />
        )}
      </div>
      {open ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-2 border-t border-gray-200 m-3 mx-auto" />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <TextInput
              label="Nombre de la tienda"
              className="text-sm"
              error={errors.name?.message}
              inputProps={{
                placeholder: "Tienda oficial",
                ...register("name", {
                  required: "El campo es requerido",
                  minLength: {
                    value: 6,
                    message:
                      "El nombre de la tienda debe tener al menos 6 letras.",
                  },
                }),
              }}
            />
            <PhoneInput
              onPrefixChange={(option) => setValue("phonePrefix", option.value)}
              className="text-sm"
              label="Teléfono"
              error={errors.phone?.message}
              inputProps={{
                placeholder: "999113934",
                ...register("phone", {
                  required: "El campo es requerido",
                  pattern: {
                    value: onlyNumbersRegex,
                    message: "El teléfono solo puede tener números",
                  },
                }),
              }}
            />

            <TextInput
              label="Correo electrónico"
              className="text-sm"
              inputProps={{ placeholder: "example@test.com", disabled: true }}
            />
            <PhoneInput
              onPrefixChange={(prefix) =>
                setValue("whatsappPrefix", prefix.value)
              }
              className="text-sm"
              label="Whatsapp"
              error={errors.whatsapp?.message}
              inputProps={{
                placeholder: "999113934",
                ...register("whatsapp", {
                  required: "El campo es requerido",
                  pattern: {
                    value: onlyNumbersRegex,
                    message: "El whastapp solo puede tener números",
                  },
                }),
              }}
            />
            <div>
              <label className="text-sm mb-2 inline-block">
                Rubro de la tienda
              </label>
              <Select
                options={[
                  {
                    component: <span>Supermercados y Mascotas</span>,
                    value: "Supermercados y Mascotas",
                  },
                  {
                    component: <span>Ropa y calzado</span>,
                    value: "Ropa y calzado",
                  },
                  {
                    component: <span>Gaming</span>,
                    value: "Gaming",
                  },
                ]}
                onChange={(option) => {
                  setValue("category", option.value);
                }}
                className="p-3 text-sm"
              />
            </div>
          </div>
          <Button submit className="mt-5 w-full md:w-auto">
            Guardar cambios
          </Button>
        </form>
      ) : null}
    </div>
  );
};

export default AdminConfigGeneral;
