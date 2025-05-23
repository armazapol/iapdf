"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonAddUser from "./ButtonAddUser";
import ButtonSwicth from "@/components/ButtonSwitch ";

type prop = {
  entity: string;
};

export default function TableUsers({ entity }: prop) {
  //const [users, setUsers] = useState([]);
  const router = useRouter();

  const [users, setUsers] = useState([
    {
      id: "1",
      author: {
        name: "Angelica Jose",
        email: "esthera@simmple.com",
        img: "/image.png",
      },
      function: "Administrador",
      fechaInicio: "06/14/25",
      fechaModification: "07/13/25",
      active: true,
    },
    {
      id: "2",
      author: {
        name: "Alexa Lliras",
        email: "alexa@simmple.com",
        img: "/image.png",
      },
      function: "Worker",
      fechaInicio: "06/14/25",
      fechaModification: "07/13/25",
      active: false,
    },
    {
      id: "3",
      author: {
        name: "Laurent Michael",
        email: "Laurent@simmple.com",
        img: "/image.png",
      },
      function: "Worker",
      fechaInicio: "06/14/25",
      fechaModification: "07/13/25",
      active: true,
    },
    {
      id: "4",
      author: {
        name: "Freaduardo Hill",
        email: "freduardo@simmple.com",
        img: "/image.png",
      },
      function: "Worker",
      fechaInicio: "06/14/25",
      fechaModification: "07/13/25",
      active: true,
    },
    {
      id: "5",
      author: {
        name: "Daniel Thomas",
        email: "daniel@simmple.com",
        img: "/image.png",
      },
      function: "Worker",
      fechaInicio: "06/14/25",
      fechaModification: "07/13/25",
      active: true,
    },
    {
      id: "6",
      author: {
        name: "Mark wilson",
        email: "mark@simmple.com",
        img: "/image.png",
      },
      function: "Worker",
      fechaInicio: "06/14/25",
      fechaModification: "07/13/25",
      active: true,
    },
  ]);

  const toggleUserActive = (id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const handleEdit = () => {
    router.push(`/home/usermanagement/edit`);
  };
  const handleNewUser = () => {
    router.push("/home/usermanagement/new");
  };

  //   useEffect(() => {
  //     // Aquí ira la llamada a la API real
  //     async function fetchUsers() {
  //       const res = await fetch('/api/users'); // Ajustar ruta
  //       const data = await res.json();
  //       setUsers(data);
  //     }

  //     fetchUsers();
  //   }, []);

  return (
    <div className=" pl-4 md:pl-0">
      <div className="flex gap-25 mb-4 md:hidden">
        <p className="font-bold text-[24px] leading-[140%] tracking-[0%] text-[#2E3A59]">
          User Table
        </p>
        <ButtonAddUser
            onClick={handleNewUser}
            src={"/user-profile-add.png"}
            alt="Add user"
            iconSize={18}
            className="flex items-center gap-[10px] rounded-[5px] px-[16px] py-[8px] text-[#FEFEFE] text-[14px] font-bold leading-[100%] tracking-[0.4px] bg-[#2E3A59] cursor-pointer"
          >
            New {entity}
          </ButtonAddUser>
      </div>
      <div className="relative px-[25px] h-[504px] rounded-[15px] bg-white shadow-[0_4px_8.8px_0_#00000021]">
        <div className="hidden md:flex justify-between relative top-[26px] w-auto">
          <p className="font-bold text-[24px] leading-[140%] tracking-[0%] text-[#2E3A59]">
            User table
          </p>
          <ButtonAddUser
            onClick={handleNewUser}
            src={"/user-profile-add.png"}
            alt="Add user"
            iconSize={18}
            className="flex items-center gap-[10px] rounded-[5px] px-[16px] py-[8px] text-[#FEFEFE] text-[14px] font-bold leading-[100%] tracking-[0.4px] bg-[#2E3A59] cursor-pointer"
          >
            New {entity}
          </ButtonAddUser>
        </div>

        <table className="w-full relative top-4 md:top-[56.5px] ">
          <thead className="text-left font-bold text-[10px] leading-[150%] text-[#2E3A59] mb-[10px]">
            <tr>
              <th className="pb-[10px]">AUTHOR</th>
              <th className="pb-[10px]">FUNCTION</th>
              <th className="pb-[10px]">CREATION DATE</th>
              <th className="pb-[10px]">MODIFICATION DATE</th>
              <th className="pb-[10px]">ACTIVE USER?</th>
              <th className="pb-[10px]"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="font-medium text-[14px] leading-[140%] text-[#2D3748] border-t border-[#E2E8F0]"
              >
                <td className="pt-[10px] pb-[10px] min-w-[240px]">
                  <div className="flex gap-[10px] ">
                    <Image
                      src={user.author.img}
                      alt={`Image user`}
                      width={40}
                      height={40}
                    />
                    <div className="">
                      <div className="text-[#2D3748] font-bold">
                        {user.author.name}
                      </div>
                      <div className="text-[12px] font-normal leading-[140%] text-[#718096]">
                        {user.author.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="pt-[10px] pb-[10px] min-w-[100px]  break-words">
                  {user.function}
                </td>
                <td className="pt-[10px] pb-[10px] min-w-[100px]">
                  {user.fechaInicio}
                </td>
                <td className="pt-[10px] pb-[10px] min-w-[110px]">
                  {user.fechaModification}
                </td>
                <td className="pl-[8px] pt-[10px] pb-[10px] min-w-[110px] ">
                  <ButtonSwicth
                    checked={user.active}
                    onChange={() => toggleUserActive(user.id)}
                  />
                </td>
                <td className="text-end text-[#2E3A59] font-bold text-[14px] leading-[150%] pt-[10px] pb-[10px] w-[200px]">
                  <button
                    onClick={() => handleEdit()}
                    className="cursor-pointer"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
