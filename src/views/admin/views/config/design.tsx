import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { SlCloudUpload } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";
import { UpdateStoreSocialFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import { useAdminContext } from "../../../../context/admin/hooks";

const AdminConfigDesign: React.FC = () => {
  const [open, setOpen] = useState(true);

  const {
    state: { store, loading },
    actions: { updateStoreSocial },
  } = useAdminContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateStoreSocialFormValues>();

  async function onSubmit(data: UpdateStoreSocialFormValues) {}

  useEffect(() => {}, [store]);

  function handleOpen() {
    setOpen(!open);
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
          <div className="grid gap-4 lg:grid-cols-2">
            {/* <div>
              <TextInput
                label="Facebook"
                className="text-sm"
                prefixComponent={
                  <span className="font-light py-2 pr-2 text-sm text-gray-500">
                    fb.com/
                  </span>
                }
                error={errors.facebook?.message}
                inputProps={{
                  ...register("facebook", {}),
                }}
              />
            </div>
            <TextInput
              label="Instagram"
              className="text-sm"
              error={errors.instagram?.message}
              prefixComponent={
                <span className="font-light py-2 pr-2 text-sm text-gray-500">
                  instagram.com/
                </span>
              }
              inputProps={{
                ...register("instagram", {}),
              }}
            />
            <TextInput
              label="Pinterest"
              className="text-sm"
              error={errors.pinterest?.message}
              prefixComponent={
                <span className="font-light py-2 pr-2 text-sm text-gray-500">
                  pinterest.com/
                </span>
              }
              inputProps={{
                ...register("pinterest", {}),
              }}
            />
            <TextInput
              label="Twitter"
              className="text-sm"
              error={errors.twitter?.message}
              prefixComponent={
                <span className="font-light py-2 pr-2 text-sm text-gray-500">
                  twitter.com/
                </span>
              }
              inputProps={{
                ...register("twitter", {}),
              }}
            />
            <TextInput
              label="Tiktok"
              className="text-sm"
              error={errors.tiktok?.message}
              prefixComponent={
                <span className="font-light py-2 pr-2 text-sm text-gray-500">
                  tiktok.com/
                </span>
              }
              inputProps={{
                ...register("tiktok", {}),
              }}
            />
            <TextInput
              label="Youtube"
              className="text-sm"
              error={errors.youtube?.message}
              prefixComponent={
                <span className="font-light py-2 pr-2 text-sm text-gray-500">
                  youtube.com/
                </span>
              }
              inputProps={{
                ...register("youtube", {}),
              }}
            /> */}
            <FileInput
              label="Logo"
              secondLabel="Sube tu el logo de tu tienda"
            />
            <FileInput
              label="Portada"
              secondLabel="Sube foto de portada (1000x30)"
              imgWidth={100}
              imgHeight={30}
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
}
const FileInput: React.FC<FileInputProps> = ({
  label,
  secondLabel,
  imgHeight,
  imgWidth,
}) => {
  const [filePath, setFilePath] = useState("");

  const inputRef: RefObject<any> = useRef(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget?.files && event.currentTarget?.files[0];

    if (file) {
      setFilePath(URL.createObjectURL(file));
    }
  };

  function handleDelete() {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
      setFilePath("");
    }
  }

  return (
    <div>
      {label ? <span className="font-light mb-2 block">{label}</span> : null}
      {!filePath ? (
        <label
          htmlFor="file"
          className="border-2 border-gray-300 border-dashed py-6 rounded-lg w-full block hover:bg-gray-50 transition-all cursor-pointer"
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
        id="file"
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
              width={imgWidth || 500}
              height={imgHeight || 500}
              alt={label || "Image input"}
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminConfigDesign;
