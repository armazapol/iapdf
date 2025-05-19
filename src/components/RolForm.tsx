'use client';

import Image from "next/image"
import ButtonSwitch from '@/components/ButtonSwitch '
import style from '@/styles/RolForm.module.css'
import { useState } from "react";
import SweetModal from "./SweetModal"
import "../styles/UserForm.module.css"
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler  } from "react-hook-form";
import { rolInputs, rolSchema } from "@/schemas/rolSchema";
import { zodResolver } from "@hookform/resolvers/zod";

type props = {
  entity: string
}

export default function RolForm({entity}: props) {

  const router = useRouter()
  const [showModal, setShowModal] = useState(false) 
  const [switches, setSwitches] = useState<{ [key: string]: boolean }>({
    switch1: false,
    switch2: false,
    switch3: false,
    switch4: false
  });

  const handleSwitchChange = (switchName: string) => {
    setSwitches((prev) => ({
      ...prev,
      [switchName]: !prev[switchName] // Cambia el estado solo para el interruptor específico
    }));
  };

  const goBack = () =>{
      router.push('/home/usermanagement/roles');
  }

  const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset
  } = useForm<rolInputs>({
     resolver: zodResolver(rolSchema),
      mode: "onChange",
      defaultValues: {
          rol: ""
      },
  })

  const onSubmit: SubmitHandler<rolInputs> = () => {
      // Simular una llamada a la API
      //router.push('/home');
      setShowModal(true);
      reset();
  };  

  return (
    <div className={style.rolContainer}>
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
          <form className={style.subContainer} onSubmit={handleSubmit(onSubmit)} >
            <h2>{entity} Role</h2>
            <div className={style.linea}></div>
            <div className={style.inputContainer}>
                <label htmlFor="rol">Role name</label>
                <input type="text" placeholder="Role name" id="rol" {...register('rol')}/>
                  {errors.rol && (
                    <p className="text-xs pt-1 text-red-500">{errors.rol.message}</p>
                  )}
            </div>
            <div className={style.linea}></div>
            <p>Role permissions</p>
            <div className={style.permissionsContainer}>
              <div>
                <span>PDF to Excel</span>
                <ButtonSwitch 
                  checked={switches.switch1}
                  onChange={() => handleSwitchChange('switch1')}
                />
              </div>
              <div>
                <span>History</span>
                <ButtonSwitch 
                  checked={switches.switch2}
                  onChange={() => handleSwitchChange('switch2')}
                />
              </div>
              <div>
                <span>Incidents</span>
                <ButtonSwitch 
                  checked={switches.switch3}
                  onChange={() => handleSwitchChange('switch3')}
                />
              </div>
              <div className={style.notDiv}>
                <span>User Management</span>
                <ButtonSwitch 
                  checked={switches.switch4}
                  onChange={() => handleSwitchChange('switch4')}
                />
              </div>  
            </div>
            <button 
              className={isValid ? style.btnTrue : style.btnSave} 
              type="submit"
              // className={isValid ? style2.btnTrue : style2.saveBtn}
              disabled={!isValid || isSubmitting}
              >Save changes
            </button>
          </form>
          <SweetModal
            evento="Role"
            show={showModal}
            onClose={() => setShowModal(false)}
          />
    </div>
  )
}
