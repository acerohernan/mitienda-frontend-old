import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { UpdateStoreSocialFormValues } from "../../../../api/tenant/types";
import Button from "../../../../components/form/button";
import TextInput from "../../../../components/form/input/text";
import { useAdminContext } from "../../../../context/admin/hooks";

const AdminConfigSocial: React.FC = () => {
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

  async function onSubmit(data: UpdateStoreSocialFormValues) {
    await updateStoreSocial(data);
  }

  useEffect(() => {
    if (!store) return;

    const {
      social: { facebook, instagram, pinterest, tiktok, twitter, youtube },
    } = store;

    setValue("facebook", facebook);
    setValue("instagram", instagram);
    setValue("pinterest", pinterest);
    setValue("tiktok", tiktok);
    setValue("twitter", twitter);
    setValue("youtube", youtube);
  }, [store]);

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
