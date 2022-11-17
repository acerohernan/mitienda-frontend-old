import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { SignUpFormValues } from "../../api/tenant/types";
import Button from "../../components/form/button";
import Select, { Option } from "../../components/form/select";
import { COUNTRIES } from "../../constants";
import { useTenantContext } from "../../context/tenant";
import { emailRegex, onlyNumbersRegex, passwordRegex } from "../../utils/regex";

function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState<Option[]>(() => {
    return COUNTRIES.map((country, index) => ({
      component: (
        <div className="flex items-center justify-center" key={index}>
          <img src={country.img_url} className="w-5 h-5" />
          <span className="ml-2">({country.prefix})</span>
        </div>
      ),
      value: country.prefix,
    }));
  });
  const [selectedPrefix, setSelectedPrefix] = useState<string>(
    options[0].value
  );

  const {
    actions: { signUp },
    state: { loading },
  } = useTenantContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  async function onSubmit(data: SignUpFormValues) {
    /* Set the phone with their prefix */
    data.phone = `${selectedPrefix}${data.phone}`;

    /* Set the country code to send to the server */
    let country_code = COUNTRIES.find(
      (country) => country.prefix === selectedPrefix
    );

    if (!country_code) country_code = COUNTRIES[0];

    data.country_code = country_code.code;

    await signUp(data);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleCountryPrefix(prefix: string) {
    setSelectedPrefix(prefix);
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
              options={options}
              onChange={(option) => handleCountryPrefix(option.value)}
              className="p-3"
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
          <Button className="w-full" submit loading={loading}>
            CREAR CUENTA
          </Button>
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
