"use client"; 

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //validaciondne login

    router.push('/home'); // Redirige a /home
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
        <form onSubmit={handleSubmit}>
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
            name="email"
            placeholder="Enter your email"
            className="block w-full p-2 mt-2 border border-gray-300 rounded bg-[#dbdbdb]"
          />

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
              name="password"
              placeholder="Enter your password"
              className="block w-full p-2 mt-2 border border-gray-300 rounded bg-[#dbdbdb]"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
            >
              <img
                src={
                  passwordVisible
                    ? "/img/eye.png"
                    : "/img/eye.png"
                }
                alt="Mostrar contraseña"
                className="w-6 h-6 cursor-pointer hover:pointer"
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-6 bg-[#B32646] text-white rounded cursor-pointer hover:pointer"
          >
           Login
          </button>
        </form>
      </div>
    </main>
  );
}
