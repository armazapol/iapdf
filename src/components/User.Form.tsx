"use client";

import FormField from "./FormField"
import style from "../styles/UserForm.module.css"
import Image from "next/image"
import SweetModal from "./SweetModal"
import { useState } from 'react';
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
        role: '',
        username: '',
        password: '',
        repeatPassword: ''
    })

    const isCompleteForm = Object.values(formData).every(value => value.trim() !== '')
    
    const goBack = () =>{
        router.push('/home/usermanagement');
    }
    
    //Manejador de modal
    const handleSaveChanges = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        setShowModal(true);  
    };
    
  return (
    <div className={style.formContainer}>
        <div className={style.div}>
            <form action="" className={style.form}>
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
                            />
                            <FormField 
                            label="Last name"
                            name="last name"
                            type="input"
                            />
                            <FormField 
                            label="Email"
                            name="email"
                            type="email"
                            />
                            <FormField 
                            label="Role"
                            name="rol"
                            type="select"
                            options=
                            {[  { value: 'admin', label: 'Admin' },
                                { value: 'editor', label: 'Editor' },
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
                            />
                            <FormField 
                            label="Password"
                            name="password"
                            type="password"
                            />
                            <FormField 
                            label="Repeat password"
                            name="repeat Password"
                            type="password"
                            />
                        </div>
                    </div>
                    <button type="submit" className={style.saveBtn} onClick={handleSaveChanges} disabled={isCompleteForm}>Save changes</button>
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
