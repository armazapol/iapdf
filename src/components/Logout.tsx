import React, { useState } from "react";
import LogoutModal from "./LogoutModal";
import Image from "next/image";

const Logout = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSetShowModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <li
        className={`font-medium flex items-center h-[50px] cursor-pointer hover:bg-[#B32646] hover:text-white rounded-md gap-4`}
        onClick={handleSetShowModal}
      >
        <Image src="/svg/icons/logouticon.svg" alt="Logout" width="16" height="16" />
        {/* <img
          src="/svg/icons/logouticon.svg"
          alt="Logout"
          className={`w-4 h-4 mr-2 `}
        /> */}
        <span>Logout</span>
      </li>
      {
        <LogoutModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
      }
    </>
  );
};

export default Logout;
