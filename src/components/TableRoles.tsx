"use client";

import React, { useState } from "react";
import ButtonAddUser from "./ButtonAddUser";
import { useRouter } from "next/navigation";
import ButtonSwitch from "./ButtonSwitch";
import { parseFormat } from "@/utils/parseFormat";
import { useAuth } from "@/context/AuthContext";

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
  permissions: {
    pdf_to_excel: boolean;
    history: boolean;
    incidents: boolean;
    user_management: boolean;
  };
};

export default function TableRoles({ entity, roles }: Props) {
  const router = useRouter();
  const [roleList, ] = useState<Role[]>(roles);
  const { isAdmin } = useAuth();

  const handleNewRol = () => {
    router.push("/home/rolesmanagement/roles/new");
  };
  const handleEditRol = (idUser: number) => {
    router.push(`/home/rolesmanagement/roles/edit/${idUser}`);
  };

  // const toggleUserActive = (id: number) => {
  //   setRoleList((prevRoles) =>
  //     prevRoles.map((info) =>
  //       info.id === id ? { ...info, isActive: !info.isActive } : info
  //     )
  //   );
  // };

  return (
    <div className="pt-5 lg:p-0 px-3 lg:pl-0 max-h-full flex flex-col">
      <div className="flex  gap-[75px] mb-[20px] md:hidden">
        <p className="text-[#2E3A59] font-bold text-xl leading-[140%]">
          Roles Table
        </p>
        {isAdmin && (
          <ButtonAddUser
            onClick={handleNewRol}
            src="/user-profile-add.png"
            alt="Add role"
            iconSize={18}
            className="flex items-center gap-2 rounded px-4 py-2 text-white text-sm font-bold bg-[#2E3A59] hover:bg-[#292964] cursor-pointer"
          >
            New {entity}
          </ButtonAddUser>
        )}
      </div>
      <div className="flex flex-col bg-white rounded-[15px] shadow-[0_4px_8.8px_0_#00000021] p-6 mb-[10px] w-full flex-1">
        <div className="hidden md:flex justify-between items-center gap-4 mb-4">
          <p className="text-[#2E3A59] font-bold text-xl leading-[140%]">
            Roles Table
          </p>
          {isAdmin && (
            <ButtonAddUser
              onClick={handleNewRol}
              src="/user-profile-add.png"
              alt="Add role"
              iconSize={18}
              className="flex items-center gap-2 rounded px-4 py-2 text-white text-sm font-bold bg-[#2E3A59] hover:bg-[#292964] cursor-pointer"
            >
              New {entity}
            </ButtonAddUser>
          )}
        </div>

        {/* Contenedor con scroll horizontal en móviles */}
        <div className="overflow-x-auto flex-1">
          {roleList.length > 0 ? (
            <table className="w-full text-left ">
              <thead className="font-bold text-[10px] leading-[150%] text-[#2E3A59]">
                <tr>
                  <th className="pb-2">ROLE</th>
                  <th className="pb-2">CREATION DATE</th>
                  <th className="pb-2">MODIFICATION DATE</th>
                  <th className="pb-2">ACTIVE ROLE?</th>
                  <th className="pb-2"></th>
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
                      {parseFormat(item.creationDate)}
                    </td>
                    <td className="py-5 font-medium"></td>
                    <td className="py-5 pl-2">
                      <ButtonSwitch
                        checked={item.isActive}
                        onChange={() => {}}
                      />
                    </td>
                    <td className="py-5 text-right min-w-[60px] lg:w-[300px]">
                      <button
                        onClick={() => handleEditRol(item.id)}
                        className="hover:underline cursor-pointer mr-2 text-[#2E3A59]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-400 py-10">
              No hay roles registrados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
