"use client";
import React, { useState } from "react";
import { FiX, FiPaperclip, FiSend } from "react-icons/fi";
import Modal from "react-modal";

interface emailProdalProps {
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
  },
};

const EmailModal = ({ showModal, onClose }: emailProdalProps) => {
  const [recipients, setRecipients] = useState([
    { name: "John Doe", email: "johndoe@email.com" },
    { name: "John Doe", email: "johndoe@email.com" },
  ]);

  const [subject, setSubject] = useState("Subject example");
  const [message, setMessage] = useState(
    "Hi, this is an example of the mailing for AI POWERED PDF to EXCEL."
  );

  const [attachments, setAttachments] = useState([
    { name: "File.pdf" },
    { name: "File.pdf" },
    { name: "File.pdf" },
  ]);

  const removeRecipient = (index: number) => {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
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
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>

          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Send email
          </h2>

          {/* From */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <div className="text-sm text-gray-800">
              John Doe &lt;supercoolman@gmail.com&gt;
            </div>
          </div>

          {/* To */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <div className="flex flex-wrap gap-2">
              {recipients.map((recipient, index) => (
                <span
                  key={index}
                  className="bg-[#B32646]/10 text-[#B32646] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span className="bg-[#B32646] text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                    {recipient.name.charAt(0)}
                  </span>
                  {recipient.name}
                  <button
                    onClick={() => removeRecipient(index)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <textarea
              className="w-full px-3 py-2 text-sm min-h-[140px] focus-visible:outline-none resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Attachments */}
          <div className="mb-6 border border-gray-300  p-4">
            <div className="flex gap-3 overflow-x-auto">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-md px-3 py-2 flex flex-col items-center justify-center relative w-24"
                >
                  <button
                    onClick={() => removeAttachment(index)}
                    className="absolute top-1 right-1 text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    <FiX size={14} />
                  </button>
                  <div className="w-8 h-10 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded mb-1">
                    📄
                  </div>
                  <div className="text-xs text-center break-words">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-between">
            <button className="border border-[#1a1a40] text-[#1a1a40] px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <FiPaperclip />
              Attach files
            </button>
            <button
              onClick={onClose}
              className="bg-[#1a1a40] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#292964] cursor-pointer"
            >
              <FiSend />
              Send Email
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailModal;
