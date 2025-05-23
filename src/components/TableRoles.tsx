"use client";

import React, { useState } from "react";
import ButtonAddUser from "./ButtonAddUser";
import { useRouter } from "next/navigation";
import ButtonSwitch from "./ButtonSwitch ";
import style from "@/styles/TableRoles.module.css";

type prop = {
  entity: string;
};

export default function TableRoles({ entity }: prop) {
  const router = useRouter();

  const handleNewRol = () => {
    router.push("/home/usermanagement/roles/new");
  };
  const handleEditRol = () => {
    router.push("/home/usermanagement/roles/edit");
  };

  const [infos, setInfos] = useState([
    {
      id: "1",
      rol: "Administrador",
      creation_date: "06/14/25",
      modification_date: "07/13/25",
      active: true,
    },
    {
      id: "2",
      rol: "Worker",
      creation_date: "06/14/25",
      modification_date: "07/13/25",
      active: true,
    },
    
  ]);

  const toggleUserActive = (id: string) => {
    setInfos((prevUsers) =>
      prevUsers.map((info) =>
        info.id === id ? { ...info, active: !info.active } : info
      )
    );
  };

  return (
    <div className="">
      <div className="flex  gap-[75px] mb-[20px] md:hidden">
        <p className="text-[#2E3A59] font-bold text-xl leading-[140%]">Roles Table</p>
        <ButtonAddUser
            onClick={handleNewRol}
            src={"/user-profile-add.png"}
            alt="Add role"
            iconSize={18}
            className="flex items-center gap-2 rounded-[5px] px-4 py-2 text-white text-sm font-bold bg-[#2E3A59] hover:opacity-90"
          >
            New {entity}
          </ButtonAddUser>
      </div>
      <div className="relative p-6 bg-white rounded-[15px] shadow-md">
        <div className="hidden md:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <p className="text-[#2E3A59] font-bold text-xl leading-[140%]">
            Roles Table
          </p>
          <ButtonAddUser
            onClick={handleNewRol}
            src={"/user-profile-add.png"}
            alt="Add role"
            iconSize={18}
            className="flex items-center gap-2 rounded px-4 py-2 text-white text-sm font-bold bg-[#2E3A59] hover:opacity-90"
          >
            New {entity}
          </ButtonAddUser>
        </div>

        {/* Contenedor con scroll horizontal en móviles */}
        <div className="overflow-x-auto br">
          <table className="min-w-[600px] w-full relative  ">
            <thead className="text-left font-bold text-[10px] leading-[150%] text-[#2E3A59] mb-2">
              <tr>
                <th className="pb-2">ROLE</th>
                <th className="pb-2">CREATION DATE</th>
                <th className="pb-2">MODIFICATION DATE</th>
                <th className="pb-2">ACTIVE ROLE?</th>
              </tr>
            </thead>
            <tbody>
              {infos.map((info) => (
                <tr
                  key={info.id}
                  className="font-bold text-[14px] text-[#2D3748] border-t border-[#E2E8F0]"
                >
                  <td className="py-5">{info.rol}</td>
                  <td className="py-5 font-medium">{info.creation_date}</td>
                  <td className="py-5 font-medium">{info.modification_date}</td>
                  <td className="py-5 pl-2">
                    <ButtonSwitch
                      checked={info.active}
                      onChange={() => toggleUserActive(info.id)}
                    />
                  </td>
                  <td className="py-5 text-right text-[#2E3A59] leading-[150%]">
                    <button onClick={handleEditRol} className="hover:underline">
                      edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
