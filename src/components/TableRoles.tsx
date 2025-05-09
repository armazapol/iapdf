'use client';

import React, { useState } from 'react'
import ButtonAddUser from './ButtonAddUser'
import { useRouter } from 'next/navigation';
import ButtonSwitch from './ButtonSwitch '
import style from '@/styles/TableRoles.module.css'

type prop = {
    entity: string
}

export default function TableRoles({entity}:prop) {

  const router = useRouter()

  const handleNewUser = () => {
    router.push('/home')
  }  

  const [infos, setInfos] = useState( [
    {
        id: "1",
        rol: "Administrador",
        creation_date: "06/14/25",
        modification_date: "07/13/25",
        active: true
    },
    {
        id: "2",
        rol: "Worker",
        creation_date: "06/14/25",
        modification_date: "07/13/25",
        active: true
    }
  ])

    const toggleUserActive = (id:string) => {
        setInfos((prevUsers) =>
        prevUsers.map((info) =>
            info.id === id ? { ...info, active: !info.active } : info
        )
        );
    };

  return (
    <div className={style.tableRolContainer}>
        <div className={style.headerRol}>
            <p>Roles Table</p>
            <ButtonAddUser 
                onClick={handleNewUser}
                src={'/user-profile-add.png'}
                alt='Add rol'
                iconSize={18}
                > New {entity}
            </ButtonAddUser>
        </div>
        <table className={style.tableRol}>
            <thead>
                <tr>
                    <th>ROLE</th>
                    <th>CREATION DATE</th>
                    <th>MODIFICACION DATE</th>
                    <th>ACTIVE ROLE?</th>
                </tr>
            </thead>
            <tbody>
                { infos.map(info => (
                   <tr key={info.id} className={style.rowRoles}>
                    <td>{info.rol}</td>
                    <td className={style.rowDate}>{info.creation_date}</td>
                    <td className={style.rowDate}>{info.modification_date}</td>
                    <td className={style.tdSwich}>
                        <ButtonSwitch 
                            checked={info.active}
                            onChange={() => toggleUserActive(info.id)}
                        />
                    </td>
                    <td className={style.rowEdit}>edit</td>
                   </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
