"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "@/schemas/loginSchema";
import { useLogin } from "@/services/apis";

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const login = useLogin();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // Simular una llamada a la API

    const payload = {
      username: data.email,
      password: data.password,
    }
    try {
      await login.mutateAsync(payload);
      router.push('/home');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main className="flex items-center min-w-screen min-h-screen bg-gray-100">
      <div className="bg-white h-[100vh] w-[60vw]">
        <img
          src="/img/PortadaLogin.png"
          alt="Portada Login"
          className="object-cover w-full h-full"
        />
      </div>
      <div className=" h-[100vh] w-[600px]  text-center flex flex-col items-center justify-center ">
        <div className="w-[400px] mb-[30px]">
          <img
            src="/img/logoLogin.png"
            alt="Portada Login"
            className="w-full h-full"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4 w-[400px] flex items-center">
            <div className="flex items-center justify-center">
              <img
                src="/img/user.png"
                alt="Icono de persona"
                className="w-4 mr-1"
              />
            </div>
            <label htmlFor="email" className="text-[#333333]">
              Email
            </label>
          </div>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`block w-full p-2 mt-2 border rounded bg-[#dbdbdb] focus-visible:outline-0 ${
              errors.email ? "border-[#B32646]" : "border-gray-300 "
            } `}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 text-left">
              {errors.email.message}
            </p>
          )}
          <div className="mb-4 flex items-center mt-4">
            <img
              src="/img/security.png"
              alt="Icono de email"
              className="w-4 mr-1"
            />
            <label htmlFor="password" className="text-[#333333]">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className={`block w-full p-2 mt-2 border rounded bg-[#dbdbdb] focus-visible:outline-0 ${
                errors.password ? "border-[#B32646]" : "border-gray-300 "
              } `}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            >
              <img
                src={passwordVisible ? "/img/eye.png" : "/img/eye.png"}
                alt="Mostrar contraseña"
                className="w-6 h-6 cursor-pointer hover:pointer"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs italic text-red-500 text-left">
              {errors.password.message}
            </p>
          )}
          <button
            type="submit"
             disabled={isSubmitting || login.isPending} 
            className="w-full p-2 mt-6 bg-[#B32646] text-white rounded cursor-pointer hover:pointer"
          >
            {
              login.isPending ? "Loading..." : "Login"
            }
          </button>
        </form>
      </div>
    </main>
  );
}
