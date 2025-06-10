"use client";

import Image from "next/image";
import ButtonSwitch from "@/components/ButtonSwitch";
import { useEffect, useState } from "react";
import SweetModal from "./SweetModal";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { rolInputs, rolSchema } from "@/schemas/rolSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRol, editRol, getRoles } from "@/app/actions";
import { useLoading } from "./providers/LoadingProvider";
import ButtonSwicth2 from "@/components/ButtonSwich2";
import { showPasswordError } from "./alerts";

type props = {
  entity: string;
  id?: number;
  activity: string;
};

export default function RolForm({ entity, id, activity }: props) {
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const [showModal, setShowModal] = useState(false);

  const goBack = () => {
    router.push("/home/rolesmanagement/roles");
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<rolInputs>({
    resolver: zodResolver(rolSchema),
    mode: "onChange",
    defaultValues: {
      rol: "",
      isActive: false,
      permissions: {
        pdf_to_excel: false,
        history: false,
        incidents: false,
        user_management: false,
      },
    },
  });

  const watchIsActive = watch("isActive");
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const rolesList = await getRoles({ only_active: "false" });
          const selectedRol = rolesList.data.find((rol) => rol.id === id);

          reset({
            rol: selectedRol?.rol || "",
            isActive: selectedRol?.isActive,
            permissions: {
              pdf_to_excel: selectedRol?.permissions?.pdf_to_excel,
              history: selectedRol?.permissions?.history,
              incidents: selectedRol?.permissions?.incidents,
              user_management:
                selectedRol?.permissions?.user_management,
            },
          });
        } catch (error) {
          showPasswordError(`${error}`);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, reset, setLoading]);

  const onSubmit: SubmitHandler<rolInputs> = async (data) => {
    setLoading(true);

    try {
      if (entity === "Edit" && id) {
        await editRol(id, data);
      } else {
        await createRol(data);
      }
      setShowModal(true);
    } catch (error) {
      showPasswordError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" border-red-400 ">
      <div
        className="relative md:left-0 md:bg-white rounded-[15px] h-[700px] md:h-[625px] 
                  md:px-0
                  left-0  max-w-full md:max-w-none
                  overflow-hidden"
      >
        <div className="flex items-center relative gap-2 md:gap-[5px] top-7 md:top-[27px] left-2.5 md:left-[25px]  cursor-pointer w-fit">
          <Image
            src="/arrow-right.png"
            alt="back arrow"
            width={24}
            height={24}
            onClick={goBack}
          />
          <p className="text-[#2E3A59] font-medium text-[16px] leading-[100%] tracking-[-0.11px]">
            Back to rol list
          </p>
        </div>
        <form
          className="relative top-12 md:top-[51px] px-4 md:px-[53px] w-full md:w-[90%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-bold text-[24px] leading-[140%] text-[#2E3A59]">
            {entity} Role
          </h2>
          <div className="border border-[#D0D5DD] w-full my-2 mb-[25px]"></div>
          <div className="flex flex-wrap  gap-7 mb-[18px] ">
            <div className="flex flex-col gap-2">
              <label
                className="font-semibold text-[16px] leading-[140%] text-[#1E1E1E]"
                htmlFor="rol"
              >
                Role name
              </label>
              <input
                type="text"
                placeholder="Rol name"
                id="rol"
                {...register("rol")}
                className="border border-[#D9D9D9] w-full max-w-[292px] min-w-[0] h-[40px] rounded-[8px] px-4 py-3 bg-[#FFFFFF] md:bg-none"
              />
              {errors.rol && (
                <p className="text-xs pt-1 text-red-500">
                  {errors.rol.message}
                </p>
              )}
            </div>
            <div className=" h-[40px] mt-[30px] flex gap-2 items-center">
              <label> Active Role:</label>
              <ButtonSwicth2
                checked={watchIsActive}
                onChange={(value: boolean) => setValue("isActive", value)}
              />
            </div>
          </div>
          <div className="border border-[#D0D5DD] w-full my-2 mb-[25px]"></div>
          <p className="font-medium text-[16px] leading-[100%] tracking-[-0.11px] underline text-[#B32646]">
            Role permissions
          </p>
          <div className="mt-4 w-full md:max-w-[292px] max-w-none">
            {/* Pendiente optimizar */}
            <div className="flex justify-between border-b border-[#E2E8F0] py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                PDF to Excel
              </span>
              <ButtonSwitch
                checked={watch("permissions.pdf_to_excel")}
                onChange={() =>
                  setValue(
                    "permissions.pdf_to_excel",
                    !getValues("permissions.pdf_to_excel")
                  )
                }
              />
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                History
              </span>
              <ButtonSwitch
                checked={watch("permissions.history")}
                onChange={() =>
                  setValue(
                    "permissions.history",
                    !getValues("permissions.history")
                  )
                }
              />
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                Incidents
              </span>
              <ButtonSwitch
                checked={watch("permissions.incidents")}
                onChange={() =>
                  setValue(
                    "permissions.incidents",
                    !getValues("permissions.incidents")
                  )
                }
              />
            </div>
            <div className="flex justify-between py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                User Management
              </span>
              <ButtonSwitch
                checked={watch("permissions.user_management")}
                onChange={() =>
                  setValue(
                    "permissions.user_management",
                    !getValues("permissions.user_management")
                  )
                }
              />
            </div>
          </div>
          <button
            className={`w-full max-w-[1525px] h-[44px] text-[#EDEEEF] border rounded-[8px] font-semibold text-[16px] leading-[24px] px-4 py-2 relative top-4 ${
              isValid
                ? "bg-[#2E3A59] border-[#B2B2B2] cursor-pointer"
                : "bg-[#B2B2B2] border-[#B2B2B2] cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Save changes
          </button>
        </form>
        <SweetModal
          evento="Role"
          activity={activity}
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={goBack}
        />
      </div>
    </div>
  );
}
