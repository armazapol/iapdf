"use client";

import Image from "next/image";
import ButtonSwitch from "@/components/ButtonSwitch ";
import { useState } from "react";
import SweetModal from "./SweetModal";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { rolInputs, rolSchema } from "@/schemas/rolSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type props = {
  entity: string;
};

export default function RolForm({ entity }: props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [switches, setSwitches] = useState<{ [key: string]: boolean }>({
    switch1: false,
    switch2: false,
    switch3: false,
    switch4: false,
  });

  const handleSwitchChange = (switchName: string) => {
    setSwitches((prev) => ({
      ...prev,
      [switchName]: !prev[switchName], // Cambia el estado solo para el interruptor específico
    }));
  };

  const goBack = () => {
    router.push("/home/usermanagement/roles");
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<rolInputs>({
    resolver: zodResolver(rolSchema),
    mode: "onChange",
    defaultValues: {
      rol: "",
    },
  });

  const onSubmit: SubmitHandler<rolInputs> = () => {
    // Simular una llamada a la API
    //router.push('/home');
    setShowModal(true);
    reset();
  };

  return (
    <div className=" border-red-400 ">
      <div
        className="relative md:left-0 md:bg-white rounded-[15px] h-[700px] md:h-[625px] 
                  md:px-0
                  left-0  max-w-full md:max-w-none
                  overflow-hidden"
      >
        <div className="flex items-center relative gap-2 md:gap-[5px] top-7 md:top-[27px] left-2.5 md:left-[25px]  cursor-pointer">
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

          <div className="flex flex-col gap-2 mb-[18px]">
            <label
              className="font-semibold text-[16px] leading-[140%] text-[#1E1E1E]"
              htmlFor="rol"
            >
              Role name
            </label>
            <input
              type="text"
              placeholder="Role name"
              id="rol"
              {...register("rol")}
              className="border border-[#D9D9D9] w-full max-w-[292px] min-w-[0] h-[40px] rounded-[8px] px-4 py-3 bg-[#FFFFFF] md:bg-none"
            />
            {errors.rol && (
              <p className="text-xs pt-1 text-red-500">{errors.rol.message}</p>
            )}
          </div>

          <div className="border border-[#D0D5DD] w-full my-2 mb-[25px]"></div>

          <p className="font-medium text-[16px] leading-[100%] tracking-[-0.11px] underline text-[#B32646]">
            Role permissions
          </p>

          <div className="mt-4 w-full md:max-w-[292px] max-w-none">
            <div className="flex justify-between border-b border-[#E2E8F0] py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                PDF to Excel
              </span>
              <ButtonSwitch
                checked={switches.switch1}
                onChange={() => handleSwitchChange("switch1")}
              />
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                History
              </span>
              <ButtonSwitch
                checked={switches.switch2}
                onChange={() => handleSwitchChange("switch2")}
              />
            </div>
            <div className="flex justify-between border-b border-[#E2E8F0] py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                Incidents
              </span>
              <ButtonSwitch
                checked={switches.switch3}
                onChange={() => handleSwitchChange("switch3")}
              />
            </div>
            <div className="flex justify-between py-4">
              <span className="font-bold text-[14px] leading-[140%] text-[#2D3748]">
                User Management
              </span>
              <ButtonSwitch
                checked={switches.switch4}
                onChange={() => handleSwitchChange("switch4")}
              />
            </div>
          </div>

          <button
            className={`w-full max-w-[1525px] h-[44px] text-[#EDEEEF] border rounded-[8px] font-semibold text-[16px] leading-[24px] px-4 py-2 relative top-4 ${
              isValid
                ? "bg-[#2E3A59] border-[#B2B2B2]"
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
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
