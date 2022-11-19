import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { API } from "../../../../api";
import { UpdateStoreSocialFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import TextInput from "../../../../components/form/input/text";
import { IStore } from "../../../../context/admin/types";
import { getHttpError } from "../../../../utils/error";
import { useToast } from "../../../../utils/toast";

interface Props {
  store: IStore;
}

const AdminConfigSocial: React.FC<Props> = ({ store }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateStoreSocialFormValues>();

  const toast = useToast();

  async function onSubmit(data: UpdateStoreSocialFormValues) {
    await updateStoreSocial(data);
  }

  async function updateStoreSocial(data: UpdateStoreSocialFormValues) {
    setLoading(true);
    try {
      const token = Cookies.get("token") || "";
      await API.tenant.updateStoreSocial(data, token);
      toast.success("Redes sociales actualizadas con éxito");
    } catch (err) {
      toast.error(getHttpError(err));
    }
    setLoading(false);
  }

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <div className="bg-white w-full shadow-sm border border-gray-200 rounded-xl p-6">
      <div
        className=" text-start text-lg font-ligth flex items-center justify-between cursor-pointer"
        onClick={handleOpen}
      >
        Redes sociales
        {open ? (
          <CgChevronUp className="w-6 h-6" />
        ) : (
          <CgChevronDown className="w-6 h-6" />
        )}
      </div>
      {open ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-2 border-t border-gray-200 m-3 mx-auto" />
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
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
                  ...register("facebook", {
                    value: store.social.facebook,
                  }),
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
                ...register("instagram", {
                  value: store.social.instagram,
                }),
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
                ...register("pinterest", {
                  value: store.social.pinterest,
                }),
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
                ...register("twitter", {
                  value: store.social.twitter,
                }),
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
                ...register("tiktok", {
                  value: store.social.tiktok,
                }),
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
                ...register("youtube", {
                  value: store.social.youtube,
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

export default AdminConfigSocial;
