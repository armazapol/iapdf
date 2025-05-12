'use client';

import Image from "next/image"
import ButtonSwitch from '@/components/ButtonSwitch '
import style from '@/styles/RolForm.module.css'
import { useState } from "react";
import SweetModal from "./SweetModal"
import "../styles/UserForm.module.css"

export default function RolForm() {

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

  const handleClick = () =>{
    setShowModal(true)
  }

  return (
    <div className={style.rolContainer}>
         <div className={style.backArrow}>
              <Image 
                src="/arrow-right.png"
                alt="back arrox"
                width={24}
                height={24}
                />
            <p>Back to user list</p>
          </div>
          <div className={style.subContainer}>
            <h2>New Role</h2>
            <div className={style.linea}></div>
            <div className={style.inputContainer}>
                <label htmlFor="">Role name</label>
                <input type="text" placeholder="Role name" id="rol" name="rol" />
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
            <button className={style.btnSave} onClick={handleClick} >Save changes</button>
          </div>
          <SweetModal
            evento="Role"
            show={showModal}
            onClose={() => setShowModal(false)}
          />
    </div>
  )
}
