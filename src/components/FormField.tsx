"use client";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  options?: Option[];
  error?: string;
};

export default function FormField<T extends FieldValues>({
  label,
  name,
  type,
  register,
  options = [],
  error,
}: Props<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div className="flex flex-col gap-[8px] mt-[20px] w-full sm:w-[292px] relative">
      <label
        htmlFor={name}
        className="text-[16px] text-[#2E3A59] font-semibold leading-[140%]"
      >
        {label}
      </label>

      {type === "select" ? (
        <div className="flex items-center relative w-full">
          <select
            {...register(name)}
            className="w-full rounded-[8px] border border-[#D9D9D9] bg-white px-[16px]  h-[40px] outline-none text-[#B2B2B2] font-normal text-[16px] leading-[100%] appearance-none"
          >
            <option value="" hidden>
              Choose a role
            </option>
            {options.map((ops) => (
              <option key={ops.value} value={ops.value} className="text-black">
                {ops.label}
              </option>
            ))}
          </select>
          <Image
            src="/arrow-bottom.png"
            alt="arrow down"
            width={16}
            height={16}
            className="absolute right-[15px] pointer-events-none"
          />
        </div>
      ) : (
        <div className="flex flex-col w-full ">
          <div className="flex items-center relative w-full">
            <input
              id={name}
              type={inputType}
              required
              placeholder={label}
              {...register(name)}
              className="w-full rounded-[8px] border border-[#D9D9D9] bg-white px-[16px] h-[40px] outline-none placeholder:text-[#B2B2B2] placeholder:text-[16px]"
            />
            {type === "password" && (
              <Image
                src="/fi-ss-eye.png"
                alt="eye icon"
                width={18}
                height={18}
                className="absolute right-[15px] cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {error && <p className="text-xs pt-1 text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}
