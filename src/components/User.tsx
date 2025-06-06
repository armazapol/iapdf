
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";


const User = () => {

  const {user} = useAuth()

  console.log("User component rendered with profile:", user);
  return (
    <>
      <div className="text-xl">
        <Image src="/img/userLogo.png" alt="" width={48} height={48} />
      </div>
      <div className="">
        <strong>{user?.name} {user?.last_name} </strong>
        <br />
        <span className="text-sm text-gray-500">{user?.role}</span>
      </div>
    </>
  );
};

export default User;
