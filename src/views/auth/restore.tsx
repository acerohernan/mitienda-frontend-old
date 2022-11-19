import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { API } from "../../api";
import { RestorePasswordFormValues } from "../../api/tenant/types";
import Button from "../../components/form/button";
import { getHttpError } from "../../utils/error";
import { passwordRegex } from "../../utils/regex";

interface Props {
  validCode: boolean;
  code: string;
}

const RestorePasswordView: React.FC<Props> = ({ validCode, code }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RestorePasswordFormValues>();

  const password_value = watch("password");

  useEffect(() => {
    setValue("code", code);
  }, []);

  async function onSubmit(data: RestorePasswordFormValues) {
    console.log(data);
  }

  async function restorePassword(data: RestorePasswordFormValues) {
    setLoading(true);
    try {
      await API.tenant.restorePassword(data);
    } catch (err) {
      toast.error(getHttpError(err));
    }
    setLoading(false);
  }

  return (
    <div className="border px-4 h-screen flex items-center bg-gray-50">
      <div className="mx-auto">
        <h1 className="h1 text-center">Restablece tu contraseña</h1>
        {!validCode ? (
          <>
            <p className="mt-4 font-light  max-w-md mx-auto text-center">
              El link ingresado no es válido
            </p>
            <div className="bg-blue-100/70 p-6 mb-16 w-full max-w-md mx-auto font-light mt-8">
              El link ingresado es inválido, revisa si es igual al enviado a tu
              correo. Si el error persiste, comunícate con soporte{" "}
              <a
                className="text-purple-800 hover:underline"
                href="mailto:soporte@mitienda.com"
              >
                soporte@mitienda.com
              </a>
              <Link href="/login" className="mt-4 link block text-center">
                Volver al login
              </Link>
            </div>
          </>
        ) : (
          <p className="mb-10 font-light mt-4 max-w-md mx-auto text-center">
            Ingresa tu email registrado para enviarte el link de
            restablecimiento de contraseña
          </p>
        )}
        {validCode ? (
          <form
            className="bg-blue-100/70 p-6 mb-16 w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-[1fr_65px] gap-1 ">
              <input
                placeholder="Contraseña *"
                className="input"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "El campo es requerido",
                  pattern: {
                    message:
                      "La contraseña tiene que tener al menos una mayúscula, un número y 8 caracteres como mínimo",
                    value: passwordRegex,
                  },
                })}
              />
              <button
                className="input flex justify-center bg-white"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye className="w-7 h-7 text-purple-700" />
                ) : (
                  <AiFillEyeInvisible className="w-7 h-7 text-purple-700" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="input-err-msg">{errors.password?.message}</span>
            )}
            <div className="my-6" />
            <div className="grid grid-cols-[1fr_65px] gap-1 ">
              <input
                placeholder="Confirmación de contraseña *"
                className="input"
                type={showPasswordConfirm ? "text" : "password"}
                {...register("re_password", {
                  required: "El campo es requerido",
                  validate: (value) =>
                    value === password_value || "Las contraseñas no coinciden",
                })}
              />

              <button
                className="input flex justify-center bg-white"
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              >
                {showPasswordConfirm ? (
                  <AiFillEye className="w-7 h-7 text-purple-700" />
                ) : (
                  <AiFillEyeInvisible className="w-7 h-7 text-purple-700" />
                )}
              </button>
            </div>
            {errors.re_password && (
              <span className="input-err-msg">
                {errors.re_password?.message}
              </span>
            )}

            <div className="my-6 mt-4" />
            <Button className="w-full" submit loading={loading}>
              RESTABLECER
            </Button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default RestorePasswordView;
