
import { userProfile } from "@/types";
import Image from "next/image";
interface Props {
  profile: userProfile
}

const User = ({profile}:Props) => {

  return (
    <>
      <div className="text-xl">
        <Image src="/img/userLogo.png" alt="" width={48} height={48} />
      </div>
      <div className="">
        <strong>{profile.username}</strong>
        <br />
        <span className="text-sm text-gray-500">{profile.role}</span>
      </div>
    </>
  );
};

export default User;
