"use client";

import React, { useState } from "react";
import ButtonAddUser from "./ButtonAddUser";
import { useRouter } from "next/navigation";
import ButtonSwitch from "./ButtonSwitch ";

type Props = {
  entity: string;
  roles: Role[];
};

type Role = {
  _id: string;
  id: number;
  rol: string;
  creationDate: string;
  isActive: boolean;
};

export default function TableRoles({ entity, roles }: Props) {
  const router = useRouter();
  const [roleList, setRoleList] = useState<Role[]>(roles);

  const handleNewRol = () => {
    router.push("/home/rolesmanagement/roles/new");
  };
  const handleEditRol = (idUser: number) => {
    router.push(`/home/rolesmanagement/roles/edit/${idUser}`);
  };

  const toggleUserActive = (id: number) => {
    setRoleList((prevRoles) =>
      prevRoles.map((info) =>
        info.id === id ? { ...info, isActive: !info.isActive } : info
      )
    );
  };

  return (
    <div className="pt-5 lg:p-0 px-3 lg:pl-0">
      <div className="flex  gap-[75px] mb-[20px] md:hidden">
        <p className="text-[#2E3A59] font-bold text-xl leading-[140%]">
          Roles Table
        </p>
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
              {roleList.map((item) => (
                <tr
                  key={item.id}
                  className="font-bold text-[14px] text-[#2D3748] border-t border-[#E2E8F0]"
                >
                  <td className="py-5">{item.rol}</td>
                  <td className="py-5 font-medium">
                    {new Date(item.creationDate).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                  <td className="py-5 font-medium">
                     {/* {new Date().toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    })} */}
                  </td>
                  <td className="py-5 pl-2">
                    <ButtonSwitch
                      checked={item.isActive}
                      onChange={() => toggleUserActive(item.id)}
                    />
                  </td>
                  <td className="py-5 text-right text-[#2E3A59] leading-[150%] lg:w-[300px]">
                    <button
                      onClick={() => handleEditRol(item.id)}
                      className="hover:underline cursor-pointer "
                    >
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
