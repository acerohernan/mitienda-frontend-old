import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { API } from "../../../../api";
import { UpdateInformationFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import PhoneInput from "../../../../components/form/input/phone";
import TextInput from "../../../../components/form/input/text";
import { PrefixNumber } from "../../../../constants";
import { ITenant } from "../../../../context/admin/types";
import { getHttpError } from "../../../../utils/error";
import { getPrefixFromNumber } from "../../../../utils/phone";

interface Props {
  tenant: ITenant;
}

const AdminProfileInformation: React.FC<Props> = ({ tenant }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState<PrefixNumber>(() =>
    getPrefixFromNumber(tenant.phone)
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateInformationFormValues>();

  async function onSubmit(data: UpdateInformationFormValues) {
    /* Set the phone prefix */
    data.phone = `${phonePrefix}${data.phone}`;

    await updateInformation(data);
  }

  useEffect(() => {
    const prefix = getPrefixFromNumber(tenant.phone);

    setValue("phone", tenant.phone.replace(prefix, ""));
  }, []);

  async function updateInformation(data: UpdateInformationFormValues) {
    setLoading(true);

    try {
      const token = Cookies.get("token") || "";
      await API.tenant.updateInformation(data, token);
      toast.success("Información actualizada con éxito");
    } catch (err) {
      toast.error(getHttpError(err));
    }

    setLoading(false);
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
              error={errors.name?.message}
              inputProps={{
                ...register("name", {
                  value: tenant.name || "",
                }),
              }}
            />
            <TextInput
              label="Apellido"
              className="text-sm"
              error={errors.surname?.message}
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
              selectedPrefix={phonePrefix}
              onPrefixChange={(prefix) => setPhonePrefix(prefix)}
              className="text-sm"
              error={errors.phone?.message}
              inputProps={{
                ...register("phone"),
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

export default AdminProfileInformation;
