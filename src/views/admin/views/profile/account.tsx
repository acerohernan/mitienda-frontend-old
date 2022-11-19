import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { UpdateInformationFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import PhoneInput from "../../../../components/form/input/phone";
import TextInput from "../../../../components/form/input/text";
import { ITenant } from "../../../../context/admin/types";

interface Props {
  tenant: ITenant;
}

const AdminProfileAccount: React.FC<Props> = ({ tenant }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInformationFormValues>();

  function onSubmit(data: UpdateInformationFormValues) {
    console.log(data);
  }

  return (
    <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6">
      <div
        className=" text-start text-lg font-ligth flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Información de la cuenta
        {open ? (
          <CgChevronUp className="w-6 h-6" />
        ) : (
          <CgChevronDown className="w-6 h-6" />
        )}
      </div>
      {open ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-2 border-t border-gray-200 m-3 mx-auto" />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[350px_1fr_1fr]">
            <TextInput
              label="Nombre"
              className="text-sm"
              inputProps={{
                ...register("name", {
                  value: tenant.name || "",
                }),
              }}
            />
            <TextInput
              label="Apellido"
              className="text-sm"
              inputProps={{
                ...register("surname", {
                  value: tenant.surname || "",
                }),
              }}
            />
            <TextInput
              label="Correo electrónico"
              className="text-sm"
              inputProps={{
                value: tenant.email,
                disabled: true,
              }}
            />
            <PhoneInput
              label="Teléfono de contacto"
              selectedPrefix="51"
              onPrefixChange={() => {}}
              className="text-sm"
              inputProps={{
                ...register("phone", {
                  value: tenant.phone || "",
                }),
              }}
            />
          </div>
          <Button submit className="mt-5 w-full md:w-auto" loading={loading}>
            Guardar cambios
          </Button>
        </form>
      ) : null}
    </div>
  );
};

export default AdminProfileAccount;
