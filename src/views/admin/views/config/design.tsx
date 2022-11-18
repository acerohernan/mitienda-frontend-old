import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { SlCloudUpload } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";
import { UpdateStoreFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import TextInput from "../../../../components/form/input/text";
import { useAdminContext } from "../../../../context/admin/hooks";

const AdminConfigDesign: React.FC = () => {
  const [open, setOpen] = useState(true);

  const {
    state: { store, loading },
    actions: { updateStoreSocial, uploadImage },
  } = useAdminContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateStoreFormValues>();

  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  useEffect(() => {
    setValue("logo_img", store?.logo_img);
    setValue("banner_img", store?.banner_img);
    setValue("description", store?.description);
  }, [store]);

  async function onSubmit(data: UpdateStoreFormValues) {
    if (logo) {
      await uploadImage(logo);
    }

    if (banner) {
      console.log("Subir banner", banner);
    }

    console.log(data);
  }

  function handleOpen() {
    setOpen(!open);
  }

  function handleLogoFile(file: File | null) {
    console.log("logo", file);
    setLogo(file);
  }

  function handleBannerFile(file: File | null) {
    console.log("banner", file);
    setBanner(file);
  }

  return (
    <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6">
      <div
        className=" text-start text-lg font-ligth flex items-center justify-between cursor-pointer"
        onClick={handleOpen}
      >
        Diseño
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
            <FileInput
              id="logo"
              label="Logo"
              secondLabel="Sube tu el logo de tu tienda"
              onChange={handleLogoFile}
            />
            <FileInput
              id="banner"
              label="Portada"
              secondLabel="Sube foto de portada (1000x30)"
              imgWidth={100}
              imgHeight={30}
              imgClassName="h-28"
              onChange={handleBannerFile}
            />
            <TextInput
              textarea
              label="Descripción de la tienda"
              className="text-sm"
              inputProps={{
                rows: 4,
                ...register("description"),
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

interface FileInputProps {
  label?: string;
  secondLabel?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgClassName?: string;
  onChange: (file: File | null) => void;
  id: string;
}
const FileInput: React.FC<FileInputProps> = ({
  label,
  secondLabel,
  imgHeight,
  imgWidth,
  id,
  imgClassName,
  onChange,
}) => {
  const [filePath, setFilePath] = useState("");

  const inputRef: RefObject<any> = useRef(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget?.files && event.currentTarget?.files[0];

    if (file) {
      setFilePath(URL.createObjectURL(file));
      onChange(file);
    }
  };

  function handleDelete() {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
      setFilePath("");
      onChange(null);
    }
  }

  return (
    <div>
      {label ? (
        <span className="font-light mb-2 block text-sm">{label}</span>
      ) : null}
      {!filePath ? (
        <label
          htmlFor={id}
          className="border-2 border-gray-300 border-dashed py-7 rounded-lg w-full block hover:bg-gray-50 transition-all cursor-pointer"
        >
          <div>
            <SlCloudUpload className="mx-auto text-purple-900 w-5 h-5 mb-2" />
            {secondLabel ? (
              <span className="text-purple-900 font-light text-center block text-sm">
                {secondLabel}
              </span>
            ) : null}
          </div>
        </label>
      ) : null}
      <input
        type="file"
        id={id}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        ref={inputRef}
      />
      {filePath ? (
        <div className="p-3 border-gray-200 border rounded-lg">
          <div className="relative">
            <button className="absolute right-0" onClick={handleDelete}>
              <TiDeleteOutline className="w-9 h-9 text-gray-500" />
            </button>

            <Image
              src={filePath}
              alt={label || "Image input"}
              className={`object-cover w-full ${imgClassName}`}
              width={imgWidth || 200}
              height={imgHeight || 200}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminConfigDesign;
