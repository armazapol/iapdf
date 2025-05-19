"use client";

import FormField from "./FormField"
import style from "../styles/UserForm.module.css"
import Image from "next/image"
import SweetModal from "./SweetModal"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserFormInputs, newUserSchema } from "@/schemas/newUserSchema";

type Props = {
    evento: string,
    userId?: string
}

export default function UserForm({ evento }: Props) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset
      } = useForm<newUserFormInputs>({
        resolver: zodResolver(newUserSchema),
        mode: "onChange",
        defaultValues: {
          email: "",
          password: "",
          repeatPassword: ""
        },
      });
    const [showModal, setShowModal] = useState(false)
    const onSubmit: SubmitHandler<newUserFormInputs> = () => {
        // Simular una llamada a la API
        //router.push('/home');
         setShowModal(true);
         reset();
    };  
 
    const goBack = () =>{
        router.push('/home/usermanagement/users');
    }
    
   
  return (
    <div className={style.formContainer}>
        <div className={style.div}>
            <form action="" className={style.form} onSubmit={handleSubmit(onSubmit)} >
                <div className={style.backArrow}>
                    <Image 
                    src="/arrow-right.png"
                    alt="back arrox"
                    width={24}
                    height={24}
                    onClick={goBack}
                    />
                    <p>Back to user list</p>
                </div>
                <div className={style.inputContainer}>
                    <h2>{evento} User</h2>
                    <div className={style.linea}/>
                    <div className={style.inputFieldContainer}>
                        <p className={style.info}>Personal data</p>
                        <div className={style.field}>
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
                            options=
                            {[  { value: 'Administrador', label: 'Administrador' },
                                { value: 'Worker', label: 'Worker' },
                            ]} 
                            />
                        </div>
                    </div>
                    <div className={style.inputFieldContainer}>
                        <p className={style.info}>Authentication</p>
                        <div className={style.field}>
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
                    {/* <button type="submit" className={isCompleteForm ? style.btnTrue : style.saveBtn} disabled={!isCompleteForm}>Save changes</button> */}
                    <button
                        type="submit"
                        className={isValid ? style.btnTrue : style.saveBtn}
                        disabled={!isValid || isSubmitting}
                        >
                        {isSubmitting ? 'Saving...' : 'Save changes'}
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
    
  )
}
