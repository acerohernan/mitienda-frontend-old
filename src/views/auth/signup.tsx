import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SignUpFormValues } from "../../api/tenant/types";
import Select from "../../components/form/select";
import { emailRegex, onlyNumbersRegex } from "../../utils/regex";

function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  function onSubmit(data: SignUpFormValues) {
    console.log(data);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="border px-4 h-screen flex items-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <h1 className="h1 text-center mb-10">Crea tu cuenta</h1>
        <form
          className="bg-blue-100/70 p-6 mb-16"
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
          <div className="my-4" />
          <div className="grid grid-cols-[1fr_65px] gap-1 ">
            <input
              placeholder="Contraseña *"
              className="input"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "El campo es requerido",
              })}
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
          {errors.password && (
            <span className="input-err-msg">{errors.password?.message}</span>
          )}
          <div className="my-6" />
          <div className="grid grid-cols-[120px_1fr] gap-1 ">
            <Select
              options={[
                {
                  component: (
                    <div className="flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Peru_%28state%29.svg/1280px-Flag_of_Peru_%28state%29.svg.png"
                        className="w-5 h-5"
                      />
                      <span className="ml-2">(51)</span>
                    </div>
                  ),
                  value: "PE",
                },
                {
                  component: (
                    <div className="flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1280px-Flag_of_Argentina.svg.png"
                        className="w-5 h-5"
                      />
                      <span className="ml-2">(54)</span>
                    </div>
                  ),
                  value: "AR",
                },
                {
                  component: (
                    <div className="flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png"
                        className="w-5 h-5"
                      />
                      <span className="ml-2">(1)</span>
                    </div>
                  ),
                  value: "US",
                },
              ]}
            />
            <div>
              <input
                placeholder="Teléfono *"
                className="input"
                {...register("phone", {
                  required: "El campo es requerido",
                  pattern: {
                    message: "Ingresa solo carateres numéricos",
                    value: onlyNumbersRegex,
                  },
                })}
              />
              {errors.phone && (
                <span className="input-err-msg">{errors.phone?.message}</span>
              )}
            </div>
          </div>
          <div className="my-6" />
          <button className="button w-full">CREAR CUENTA</button>
          <div className="my-2" />
          <Link href="/login" className="link block text-center text-sm">
            Ingresa con tu cuenta
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUpView;
