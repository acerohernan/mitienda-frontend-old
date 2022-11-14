import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoginFormValues } from "../../api/tenant/types";

function LoginView() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  function onSubmit(data: LoginFormValues) {
    console.log(data);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="border px-4 h-screen flex items-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <h1 className="h1 text-center mb-10">¡Bienvenido!</h1>
        <form
          className="bg-blue-100/70 p-6 mb-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input placeholder="Correo electrónico *" className="input" />
          <div className="my-4" />
          <div className="grid grid-cols-[1fr_65px] gap-1 ">
            <input
              placeholder="Contraseña *"
              className="input"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="input flex justify-center bg-white"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <AiFillEye className="w-7 h-7 text-purple-700" />
              ) : (
                <AiFillEyeInvisible className="w-7 h-7 text-purple-700" />
              )}
            </button>
          </div>
          <div className="my-6" />
          <button className="button w-full" type="submit">
            INICIAR SESIÓN
          </button>
          <div className="my-1" />
          <Link
            href="/forgot-password"
            className="link  text-sm block text-center"
          >
            Olvidé mi contraseña
          </Link>
          <div className="my-5" />
          <Link href="/signup" className="link block text-center text-sm">
            ¿Aún no tienes cuenta? ¡Crea una!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
