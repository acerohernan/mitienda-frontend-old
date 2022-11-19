import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { API } from "../../api";
import { ForgotPasswordFormValues } from "../../api/tenant/types";
import Button from "../../components/form/button";
import { getHttpError } from "../../utils/error";
import { emailRegex } from "../../utils/regex";

function ForgotPasswordView() {
  const [loading, setLoading] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const email_value = watch("email");

  async function onSubmit(data: ForgotPasswordFormValues) {
    await sendEmail(data);
  }

  async function sendEmail(data: ForgotPasswordFormValues) {
    setLoading(true);
    try {
      await API.tenant.forgotPassword(data);
      setEmailSended(true);
    } catch (err) {
      toast.error(getHttpError(err));
    }
    setLoading(false);
  }

  return (
    <div className="border px-4 h-screen flex items-center bg-gray-50">
      <div className="mx-auto">
        <h1 className="h1 text-center">Recupera tu contraseña</h1>
        {emailSended ? (
          <>
            <p className="mt-4 font-light  max-w-md mx-auto text-center">
              Tu email ha sido enviado correctamente
            </p>
            <div className="bg-blue-100/70 p-6 mb-16 w-full max-w-md mx-auto font-light mt-8">
              EL link para restablecer tu contraseña ha sido enviado a{" "}
              <em className="font-medium">{email_value}</em>. Si no logra
              aparecer en tu bandeja en 3 minutos, revisa el spam.
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
        {!emailSended ? (
          <form
            className="bg-blue-100/70 p-6 mb-16 w-full max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              placeholder="Correo electrónico *"
              className="input"
              {...register("email", {
                required: "El campo es requerido",
                pattern: {
                  message: "Ingresa un correo electrónico válido",
                  value: emailRegex,
                },
              })}
            />
            {errors.email && (
              <span className="input-err-msg">{errors.email?.message}</span>
            )}
            <div className="my-6 mt-4" />
            <Button className="w-full" submit loading={loading}>
              ENVIAR EMAIL
            </Button>
            <div className="my-1" />
            <Link href="/login" className="link  text-sm block text-center">
              Ya recordé mi contraseña
            </Link>
            <div className="my-5" />
            <Link href="/signup" className="link block text-center text-sm">
              ¿Aún no tienes cuenta? ¡Crea una!
            </Link>
          </form>
        ) : null}
      </div>
    </div>
  );
}

export default ForgotPasswordView;
