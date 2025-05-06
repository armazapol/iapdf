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
    const [name, setName] = useState("");

    
    const goBack = () =>{
        router.push('/home/usermanagement');
    }

    const handleSaveChanges = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        setShowModal(true);  
    };
    
  return (
    <div className={style.formContainer}>
        <div className={style.div}>
            <form action="">
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
                            />
                            <FormField 
                            label="Last name"
                            name="last name"
                            type="input"
                            value=""
                            onChange={(e) => setName(e.target.value)}  
                            />
                            <FormField 
                            label="Email"
                            name="email"
                            type="email"
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
                            />
                            <FormField 
                            label="Role"
                            name="rol"
                            type="select"
                            options=
                            {[  { value: 'admin', label: 'Admin' },
                                { value: 'editor', label: 'Editor' },
                            ]}
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
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
                    <button type="submit" className={style.saveBtn} onClick={handleSaveChanges}>Save changes</button>
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
