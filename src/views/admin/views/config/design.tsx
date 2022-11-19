import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { API } from "../../../../api";
import { UpdateStoreFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import FileInput from "../../../../components/form/input/file";
import TextInput from "../../../../components/form/input/text";
import { IStore } from "../../../../context/admin/types";
import { getHttpError } from "../../../../utils/error";
import { useToast } from "../../../../utils/toast";

interface Props {
  store: IStore;
}

const AdminConfigDesign: React.FC<Props> = ({ store }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<UpdateStoreFormValues>();

  const [logo, setLogo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(store.banner_img);
  const [logoUrl, setLogoUrl] = useState<string | null>(store.logo_img);

  const toast = useToast();

  async function onSubmit(data: UpdateStoreFormValues) {
    if (!logo && !logoUrl) data.logo_img = null;

    if (!banner && !bannerUrl) data.banner_img = null;

    if (logo) {
      const url = await uploadImage(logo);
      if (url) data.logo_img = url;
    }

    if (banner) {
      const url = await uploadImage(banner);
      if (url) data.banner_img = url;
    }

    await updateStoreInformation(data);
  }

  async function uploadImage(file: File): Promise<string | null> {
    setLoading(true);

    const formData = new FormData();
    formData.append("img", file);

    const token = Cookies.get("token") || "";

    try {
      const response = await API.tenant.uploadImage(formData, token);
      setLoading(false);
      return response.data.url;
    } catch (err) {
      toast.error(getHttpError(err));
      setLoading(false);
      return null;
    }
  }

  async function updateStoreInformation(
    data: UpdateStoreFormValues
  ): Promise<void> {
    setLoading(true);
    const token = Cookies.get("token") || "";

    try {
      await API.tenant.updateStoreInformation(data, token);
      toast.success("Diseño de tienda actualizado");
    } catch (err) {
      toast.error(getHttpError(err));
    }
    setLoading(false);
  }

  function handleLogoImg(file: File | null, fileUrl: string | null) {
    setLogo(file);
    setLogoUrl(fileUrl);
  }

  function handleBannerImg(file: File | null, fileUrl: string | null) {
    setBanner(file);
    setBannerUrl(fileUrl);
  }

  return (
    <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6">
      <div
        className=" text-start text-lg font-ligth flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
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
              value={store.logo_img}
              onChange={handleLogoImg}
            />
            <FileInput
              id="banner"
              label="Portada"
              secondLabel="Sube foto de portada (1000x30)"
              imgWidth={100}
              imgHeight={30}
              imgClassName="h-28"
              value={store.banner_img}
              onChange={handleBannerImg}
            />
            <TextInput
              textarea
              label="Descripción de la tienda"
              className="text-sm"
              inputProps={{
                rows: 4,
                ...register("description", {
                  value: store.description,
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

export default AdminConfigDesign;
