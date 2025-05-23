"use client";
import Image from "next/image";
import React from "react";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { handleLogout } from "@/app/actions";

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
}

Modal.setAppElement("#main");

const customStyles = {
  content: {
    //    position: "relative",
    inset: "auto",
    padding: 0,
    backgroundColor: "#fff",
    zIndex: 1000,
  },
  overlay: {
    zIndex: 1000,
  },
};

const LogoutModal = ({ showModal, onClose }: ModalProps) => {
  const logout = async () => {
    await handleLogout()
  };
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => onClose()}
      contentLabel="Send Email"
      style={customStyles}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
        <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-xl">
          <div className="flex items-center justify-center flex-col my-8">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>

            <Image src={"/question.png"} alt="check" width={60} height={60} />
            <h2 className="text-xl font-bold text-gray-700 text-center my-4">
              Are you sure you want to log off?
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Any conversation or change may be lost
            </p>

            {/* Footer buttons */}
            <div className="flex justify-between gap-6 mt-4">
              <button
                onClick={onClose}
                className="border border-[#1a1a40] text-[#1a1a40] px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
              >
                Stay in this page
              </button>
              <button
                onClick={logout}
                className="bg-[#1a1a40] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#292964] cursor-pointer"
              >
                Yes, log off
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
