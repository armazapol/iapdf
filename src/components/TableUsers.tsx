"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonAddUser from "./ButtonAddUser";
import ButtonSwicth from "@/components/ButtonSwitch";
import Skeleton from "react-loading-skeleton";
import { parseFormat } from "@/utils/parseFormat";
import { useAuth } from "@/context/AuthContext";

type prop = {
  entity: string;
  data: User[];
};
type User = {
  idUser: number;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  last_name: string;
  name: string;
  creationDate: string;
  modificationDate: string;
};
export default function TableUsers({ entity, data }: prop) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const handleEdit = (idUser: number) => {
    router.push(`/home/usermanagement/users/edit/${idUser}`);
  };
  const handleNewUser = () => {
    router.push("/home/usermanagement/users/new");
  };
  return (
    <div className="pl-4 md:pl-0 pt-5 lg:pt-0 h-full ">
      {/* Esto es mobile */}
      <div className="flex mb-4 md:hidden items-center gap-15 pb-2">
        <p className="font-bold text-[24px] leading-[140%] tracking-[0%] text-[#2E3A59] w-[120px]">
          User Table
        </p>
        <ButtonAddUser
          onClick={handleNewUser}
          src={"/user-profile-add.png"}
          alt="Add user"
          iconSize={18}
          className="flex items-center justify-center gap-[10px] rounded-[5px] w-[129px] h-[37px] text-[#FEFEFE] text-[14px] font-bold leading-[100%] tracking-[0.4px] bg-[#2E3A59] cursor-pointer"
        >
          New {entity}
        </ButtonAddUser>
      </div>
      <div className="px-[25px] w-full rounded-[15px] bg-white shadow-[0_4px_8.8px_0_#00000021] flex flex-col h-full">
        <div className="hidden md:flex justify-between mt-[20px] min-w-[600px]">
          <p className="font-bold text-[24px] leading-[140%] tracking-[0%] text-[#2E3A59]">
            User table
          </p>
          {isAdmin && (
            <ButtonAddUser
              onClick={handleNewUser}
              src={"/user-profile-add.png"}
              alt="Add user"
              iconSize={18}
              className="flex items-center gap-[10px] rounded-[5px] px-[16px] py-[8px] text-[#FEFEFE] text-[14px] font-bold leading-[100%] tracking-[0.4px] bg-[#2E3A59] cursor-pointer"
            >
              New {entity}
            </ButtonAddUser>
          )}
        </div>
        <div className="overflow-y-auto mt-[20.5px] md:h-[200px]  mb-4 flex-1">
          <table className="w-full relative top-4 h-full">
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
              {users.length === 0
                ? [...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex} className="border-t border-[#E2E8F0]">
                      {[...Array(5)].map((_, colIndex) => (
                        <td key={colIndex} className="py-4 px-2">
                          <Skeleton height={30} />
                        </td>
                      ))}
                    </tr>
                  ))
                : users.map((user) => (
                    <tr
                      key={user.idUser}
                      className="font-medium text-[14px] leading-[140%] text-[#2D3748] border-t border-[#E2E8F0]"
                    >
                      <td className="pt-[10px] pb-[10px] min-w-[240px]">
                        <div className="flex gap-[10px] ">
                          <Image
                            src={"/image.png"}
                            alt={`Image user`}
                            width={40}
                            height={40}
                          />
                          <div>
                            <div className="text-[#2D3748] font-bold">
                              {user.username}
                            </div>
                            <div className="text-[12px] font-normal leading-[140%] text-[#718096]">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="pt-[10px] pb-[10px] min-w-[100px] break-words">
                        {user.role}
                      </td>
                      <td className="pt-[10px] pb-[10px] min-w-[100px]">
                        {parseFormat(user.creationDate)}
                      </td>
                      <td className="pt-[10px] pb-[10px] min-w-[110px]">
                        {parseFormat(user.modificationDate)}
                      </td>
                      <td className="pl-[8px] pt-[10px] pb-[10px] min-w-[110px]">
                        <ButtonSwicth
                          checked={user.isActive}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="text-end text-[#2E3A59] font-bold text-[14px] leading-[150%] pt-[10px] pb-[10px] w-[200px]">
                        <button
                          onClick={() => handleEdit(user.idUser)}
                          className="cursor-pointer mr-2"
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
    </div>
  );
}
