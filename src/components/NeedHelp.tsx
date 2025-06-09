'use client'
import React, { useState } from "react";
import EmailModal from "./EmailModal";

const NeedHelp = () => {
  const [showModalSendEmail, setShowModalSendEmail] = useState(false);

  const handleSendEmail = () => {
    setShowModalSendEmail(true);
  };

  return (
    <div className="bg-pink-200 p-4 rounded-md text-sm">
      <p className="font-semibold">Need help?</p>
      <p className="mb-2">Please contact us</p>
      <button
        onClick={handleSendEmail}
        className="w-full bg-[#B32646] text-white rounded-md py-1 text-sm hover:bg-pink-700 cursor-pointer"
      >
        Send email
      </button>
      {showModalSendEmail && (
        <EmailModal
          showModal={showModalSendEmail}
          onClose={() => setShowModalSendEmail(false)}
        />
      )}
    </div>
  );
};

export default NeedHelp;
