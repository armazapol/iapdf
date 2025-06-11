"use client";

import FormField from "./FormField";
import Image from "next/image";
import SweetModal from "./SweetModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserFormInputs, UserSchema } from "@/schemas/newUserSchema";
import { assignUserRole, createUser, updateUser } from "@/app/actions";
import { showPasswordError } from "./alerts";
import ButtonSwicth2 from "@/components/ButtonSwich2";
import { useAuth } from "@/context/AuthContext";
import { userProfile } from "@/types";
import { useLoading } from "./providers/LoadingProvider";

type Props = {
  evento: string;
  idUser?: number;
  activity: string;
  roles?: { value: string; label: string }[];
  userData?: userProfile;
};

export default function UserForm({
  evento,
  idUser,
  activity,
  roles,
  userData,
}: Props) {
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    setValue,
  } = useForm<newUserFormInputs>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      isActive: false,
    },
  });

  const watchIsActive = watch("isActive");

  // Cargar datos si se pasa userData desde vista edit
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        username: userData.username || "",
        role: userData.role || "",
        isActive: userData.isActive || false,
        password: "",
        repeatPassword: "",
      });
    }
  }, [userData, reset]);

  const onSubmit: SubmitHandler<newUserFormInputs> = async (formData) => {
    setLoading(true);
    try {
      if (evento === "Edit" && idUser) {
        await updateUser(idUser, formData);
      } else {
        const createdUser = await createUser(formData);
        if (createdUser) {
          await assignUserRole(createdUser.idUser, createdUser.role);
        }
      }
      setShowModal(true);
    } catch (error) {
      showPasswordError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    router.push("/home/usermanagement/users");
  };

  return (
    <div className="w-full h-100 ">
      <div className="w-full  lg:bg-[#FFFFFF] rounded-[15px] lg:shadow-[0px_3.5px_8.8px_0px_rgba(0,0,0,0.13)] ">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          <div className="flex items-center relative gap-[5px] top-[27px] left-[10px] lg:left-[24px] w-fit h-[24px]">
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

          <div className="relative mt-[51px] px-4 lg:px-[53px] ">
            <h2 className="text-[24px] leading-[140%] font-bold text-[#2E3A59]">
              {evento} User
            </h2>
            <div className="w-full  max-w-full sm:max-w-[1225px] relative top-[10px] border-[#ddd0dc]" />
            <div className="border border-[#D0D5DD] w-full lg:w-[85%] relative top-[10px]"></div>
            {/* Personal data */}
            <div className="mb-[20px] w-full sm:pr-[20px]">
              <p className="text-[16px] font-medium leading-[100%] tracking-[-0.11px] text-[#B32646] underline relative top-[32px]">
                Personal data
              </p>
              <div className="flex flex-wrap gap-y-[5px] gap-x-[20px] relative top-[28px] ">
                <FormField<newUserFormInputs>
                  label="Name"
                  name="name"
                  type="text"
                  register={register}
                  error={errors.name?.message}
                />
                <FormField<newUserFormInputs>
                  label="Last name"
                  name="last_name"
                  type="input"
                  register={register}
                  error={errors.last_name?.message}
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
                  name="role"
                  type="select"
                  register={register}
                  error={errors.role?.message}
                  options={roles}
                />
                <div className="w-[192px] h-[40px] text-center flex gap-2.5 items-center mt-[48px]">
                  <div className="flex gap-4">
                    <label className="text-black">Active user:</label>
                    <ButtonSwicth2
                      checked={watchIsActive}
                      onChange={(value: boolean) => setValue("isActive", value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Authentication */}
            {isAdmin && (
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
            )}

            <div className="mt-16 mb-7 sm:w-[600px] xl:w-[902px] xl:max-w-[1225px]">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={` mb-7 w-full sm:w-full xl:w-[918px] sm:max-w-[1225px] h-[44px] text-[#EDEEEF] border border-[#B2B2B2] py-[10px] px-[16px] rounded-[8px] font-semibold text-[16px] leading-[24px] ${
                  isValid
                    ? "bg-[#2E3A59] cursor-pointer"
                    : "bg-[#B2B2B2] cursor-not-allowed"
                }`}
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <SweetModal
        evento="Employee"
        activity={activity}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={goBack}
      />
    </div>
  );
}
