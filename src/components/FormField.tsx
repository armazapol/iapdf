"use client";

import style from "../styles/UserForm.module.css"
import Image from "next/image";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister, } from "react-hook-form";

type Option = {
    value: string;
    label: string;
};

type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    type?: string;
    required?: boolean
    register: UseFormRegister<T>
    options?: Option[]
    error?: string
  };


export default function FormField<T extends FieldValues>({label, name, type, register, options=[], error}: Props<T>){

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
      };

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    return(
        <div className={style.inputField}>
            <label htmlFor={name}>{label}</label>
            {type=='select' ? (
                <div className={style.selectWrapper}>
                    <select {...register(name)} className={`${style.input} ${style.select}`}>
                        <option value="" hidden >Choose a role</option>
                        {options.map( (ops) => (
                            <option key={ops.value} value={ops.value}>
                                {ops.label}
                            </option>
                        ))}
                    </select>
                    <Image 
                     src="/arrow-bottom.png"
                     alt="back arrox"
                     width={16}
                     height={16}
                    />
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className={`${style.inputWrapper}`}>
                        <input
                        id={name}
                        type={inputType}
                        required
                        placeholder={label}
                        {...register(name)}
                        className={style.input}
                        />
                        {type === 'password' && (
                            <Image 
                            src="/fi-ss-eye.png"
                            alt="back arrox"
                            width={18}
                            height={18}
                            className={style.eye}
                            onClick={togglePasswordVisibility}
                        />
                        )}
                    </div>
                    {error && <p className=" text-xs pt-1 text-red-500">{error}</p>}
                </div>
            )}
       </div>
    )
}