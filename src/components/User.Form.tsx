"use client";

import FormField from "./FormField";
import style from "../styles/UserForm.module.css";
import Image from "next/image";
import SweetModal from "./SweetModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserFormInputs, newUserSchema } from "@/schemas/newUserSchema";

type Props = {
  evento: string;
  userId?: string;
};

export default function UserForm({ evento }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<newUserFormInputs>({
    resolver: zodResolver(newUserSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  const [showModal, setShowModal] = useState(false);
  const onSubmit: SubmitHandler<newUserFormInputs> = () => {
    // Simular una llamada a la API
    //router.push('/home');
    setShowModal(true);
    reset();
  };

  const goBack = () => {
    router.push("/home/usermanagement/users");
  };

  return (
    <div className="w-full h-100 ">
      <div className="w-full sm:h-[625px] lg:bg-[#FFFFFF] rounded-[15px] lg:shadow-[0px_3.5px_8.8px_0px_rgba(0,0,0,0.13)]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          <div className="flex items-center relative gap-[5px] top-[27px]  left-[10px] lg:left-[24px] w-fit h-[24px]">
            <Image
              src="/arrow-right.png"
              alt="back arrow"
              width={24}
              height={24}
              onClick={goBack}
              className="cursor-pointer"
            />
            <p className="font-medium text-[16px] leading-[100%] tracking-[-0.11px] text-[#2E3A59]">
              Back to user list
            </p>
          </div>

          <div className="relative top-[51px] px-4 lg:px-[53px] w-full">
            <h2 className="text-[24px] leading-[140%] font-bold text-[#2E3A59]">
              {evento} User
            </h2>

            <div className="w-full  max-w-full sm:max-w-[1225px] relative top-[10px] border-[#ddd0dc]" />
            
            {/* Personal data */}
            <div className="mb-[20px] w-full sm:pr-[20px]">
              <p className="text-[16px] font-medium leading-[100%] tracking-[-0.11px] text-[#B32646] underline relative top-[32px]">
                Personal data
              </p>
              <div className="flex flex-wrap gap-y-[5px] gap-x-[20px] relative top-[28px]">
                <FormField<newUserFormInputs>
                  label="Name"
                  name="name"
                  type="text"
                  register={register}
                  error={errors.name?.message}
                />
                <FormField<newUserFormInputs>
                  label="Last name"
                  name="lastName"
                  type="input"
                  register={register}
                  error={errors.lastName?.message}
                />
                <FormField<newUserFormInputs>
                  label="Email"
                  name="email"
                  type="email"
                  required
                  register={register}
                  error={errors.email?.message}
                />
                <FormField<newUserFormInputs>
                  label="Role"
                  name="rol"
                  type="select"
                  register={register}
                  error={errors.rol?.message}
                  options={[
                    { value: "Administrador", label: "Administrador" },
                    { value: "Worker", label: "Worker" },
                  ]}
                />
              </div>
            </div>

            {/* Authentication */}
            <div className="mb-[20px] w-full sm:pr-[20px]">
              <p className="text-[16px] font-medium leading-[100%] tracking-[-0.11px] text-[#B32646] underline relative top-[32px]">
                Authentication
              </p>
              <div className="flex flex-wrap gap-y-[5px] gap-x-[20px] relative top-[28px]">
                <FormField<newUserFormInputs>
                  label="Username"
                  name="username"
                  type="text"
                  register={register}
                  error={errors.username?.message}
                />
                <FormField<newUserFormInputs>
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  error={errors.password?.message}
                />
                <FormField<newUserFormInputs>
                  label="Repeat password"
                  name="repeatPassword"
                  type="password"
                  register={register}
                  error={errors.repeatPassword?.message}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`w-full sm:w-[923px] sm:max-w-[1225px] h-[44px] text-[#EDEEEF] border border-[#B2B2B2] py-[10px] px-[16px] rounded-[8px] font-semibold text-[16px] leading-[24px] relative top-[60px] ${
                isValid
                  ? "bg-[#2E3A59] cursor-pointer"
                  : "bg-[#B2B2B2] cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>

      <SweetModal
        evento="Employee"
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
