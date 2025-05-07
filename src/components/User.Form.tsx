"use client";

import FormField from "./FormField"
import style from "../styles/UserForm.module.css"
import Image from "next/image"
import SweetModal from "./SweetModal"
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

type Props = {
    evento: string,
    userId?: string
}

export default function UserForm({evento, userId}: Props) {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        rol: '',
        username: '',
        password: '',
        repeatPassword: ''
    })

    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     //const isCompleteForm = Object.values(formData).every(value => value.trim() !== '') && emailRegex.test(formData.email)
    const isCompleteForm = Object.values(formData).every(value => value.trim() !== '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const goBack = () =>{
        router.push('/home/usermanagement');
    }
    
    //Envia form y maneja estado modal
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        // limpiar el formulario 
        setFormData({
            name: "",
            lastName: "",
            email: "",
            rol: "",
            username: "",
            password: "",
            repeatPassword: "",
          });

        setShowModal(true); 
    };

  return (
    <div className={style.formContainer}>
        <div className={style.div}>
            <form action="" className={style.form} onSubmit={handleSubmit}>
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
                            <FormField 
                            label="Name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            />
                            <FormField 
                            label="Last name"
                            name="lastName"
                            type="input"
                            value={formData.lastName}
                            onChange={handleChange}
                            />
                            <FormField 
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            />
                            <FormField 
                            label="Role"
                            name="rol"
                            type="select"
                            value={formData.rol}
                            onChange={handleChange}
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
                            <FormField 
                            label="Username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            />
                            <FormField 
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            />
                            <FormField 
                            label="Repeat password"
                            name="repeatPassword"
                            type="password"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className={isCompleteForm ? style.btnTrue : style.saveBtn} disabled={!isCompleteForm}>Save changes</button>
                </div>
            </form>
        </div>
        <SweetModal
        evento="Employeed"
        show={showModal}
        onClose={() => setShowModal(false)}
        />
    </div>
    
  )
}
