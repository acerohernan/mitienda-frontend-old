import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { UpdateStoreFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import PhoneInput from "../../../../components/form/input/phone";
import TextInput from "../../../../components/form/input/text";
import Select from "../../../../components/form/select";
import { CATEGORIES } from "../../../../constants";
import { useAdminContext } from "../../../../context/admin/hooks";
import { onlyNumbersRegex } from "../../../../utils/regex";

const AdminConfigGeneral: React.FC = () => {
  const [open, setOpen] = useState(false);

  /* Form prefix */
  const [phonePrefix, setPhonePrefix] = useState("51");
  const [whatsappPrefix, setWhatsappPrefix] = useState("51");
  const [category, setCategory] = useState<string>(CATEGORIES[0].name);

  const {
    state: { store },
    actions: { updateStore },
  } = useAdminContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateStoreFormValues>();

  useEffect(() => {
    setValue("name", store?.name || "");
    setValue("category", store?.category || "");

    /* Phone */
    const telephone = getPrefixAndPhoneNumber(store?.telephone);
    const whatsapp = getPrefixAndPhoneNumber(store?.whatsapp);

    setPhonePrefix(telephone.prefix);
    setWhatsappPrefix(whatsapp.prefix);

    setValue("whatsapp", whatsapp.phone);
    setValue("telephone", telephone.phone);

    setCategory(store?.category || CATEGORIES[0].name);
  }, [store]);

  async function onSubmit(data: UpdateStoreFormValues) {
    /* Set the phone and whatsapp prefix */
    data.telephone = `${phonePrefix}${data.telephone}`;
    data.whatsapp = `${whatsappPrefix}${data.whatsapp}`;

    console.log(data);
    await updateStore(data);
  }

  function handleOpen() {
    setOpen(!open);
  }

  function getPrefixAndPhoneNumber(number?: string): {
    prefix: string;
    phone: string;
  } {
    let prefix;
    let phone;
    let sliceNumber = 2;

    if (!number) {
      return {
        phone: "",
        prefix: "51",
      };
    }

    /* US prefix */
    if (number.startsWith("1")) sliceNumber = 1;

    prefix = number.slice(0, sliceNumber);
    phone = number.slice(sliceNumber);

    return {
      phone,
      prefix,
    };
  }

  return (
    <div className="bg-white w-full shadow-md rounded-xl p-6">
      <div
        className=" text-start text-lg font-ligth flex items-center justify-between cursor-pointer text-purple-900"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-2 border-t border-gray-200 m-3 mx-auto" />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <TextInput
              label="Facebook"
              className="text-sm"
              error={errors.name?.message}
              inputProps={{
                placeholder: "fb.com",
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
              onPrefixChange={(prefix) => setPhonePrefix(prefix)}
              className="text-sm"
              label="Teléfono"
              error={errors.telephone?.message}
              selectedPrefix={phonePrefix}
              inputProps={{
                placeholder: "999113934",
                ...register("telephone", {
                  required: "El campo es requerido",
                  pattern: {
                    value: onlyNumbersRegex,
                    message: "El teléfono solo puede tener números",
                  },
                }),
              }}
            />
            <PhoneInput
              onPrefixChange={(prefix) => setWhatsappPrefix(prefix)}
              className="text-sm"
              label="Whatsapp"
              selectedPrefix={whatsappPrefix}
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
                options={CATEGORIES.map((category) => {
                  return {
                    component: <span>{category.name}</span>,
                    value: category.name,
                  };
                })}
                onChange={(option) => {
                  setValue("category", option.value);
                }}
                defaultOption={{
                  component: <span>{category}</span>,
                  value: category,
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
