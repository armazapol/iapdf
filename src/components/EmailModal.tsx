"use client"

import { getUsers, sendEmail } from "@/app/actions";
import { userProfile } from "@/types";
import React, { useEffect, useState } from "react";
import { FiX, FiPaperclip, FiSend } from "react-icons/fi";
import Modal from "react-modal";
import Select, { MultiValue } from "react-select";
import { showPasswordError, showSuccess } from "./alerts";

interface emailProdalProps {
  showModal: boolean;
  onClose: () => void;
}

interface User {
  value: string;
  label: string;
}

Modal.setAppElement("#main");

const customStyles = {
  content: {
    //    position: "relative",
    inset: "auto",
    padding: 0,
    backgroundColor: "#fff",
  },
  overlay: {
    zIndex: 1000,
  },
};

const EmailModal = ({ showModal, onClose }: emailProdalProps) => {
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<User>>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // const [recipients, setRecipients] = useState([
  //   { name: "John Doe", email: "johndoe@email.com" },
  //   { name: "John Doe", email: "johndoe@email.com" },
  // ]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(
    ""
  );

  const [attachments, setAttachments] = useState([
    { name: "File.pdf" },
    { name: "File.pdf" },
    { name: "File.pdf" },
  ]);

  // const removeRecipient = (index: number) => {
  //   setRecipients((prev) => prev.filter((_, i) => i !== index));
  // };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendEmail = async () => {
    if(selectedUsers.length === 0) {
      return showPasswordError("Please select at least one user to send the email.");
    }

    if (subject.trim() === "") {
      return showPasswordError("Subject cannot be empty.");
    }

    if (message.trim() === "") {
      return showPasswordError("Message cannot be empty.");
    }


    try {
      setLoading(true);
      const usersToPayload = selectedUsers.map((user) => ({
        email: user.label,
        name: user.value, // Assuming the name is the part before the '@'
      }))

      const payload = {
        to: usersToPayload,
        subject: subject,
        body: message,
        file_links: [], // Assuming you want to send the file names
      }

      console.log("Sending email with payload:", payload);
      await sendEmail(payload)
      showSuccess("Email sent successfully")
      onClose()
      setLoading(false);
    } catch (error) {
      console.error("Error sending email:", error);
      setLoading(false);
      return showPasswordError("An error occurred while sending the email.");
    }
  };



  const getApiUsers = async () => {
    try {
      const response = await getUsers();
      const newUser = response.map((user: userProfile) => ({
        value:`${user.name} ${user.last_name}`,
        label: user.email,
      }));
      setUsers(newUser);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      getApiUsers();
    }
  }, [users]);


  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => onClose()}
      contentLabel="Send Email"
      style={customStyles}

    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 md:p-0">
        <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-xl ">
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
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={users}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select users..."
              onChange={setSelectedUsers}
            />
            {/* <div className="flex flex-wrap gap-2">
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
            </div> */}
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
              placeholder="Write your message here..."
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
              onClick={handleSendEmail}
              disabled={loading}
              className="bg-[#1a1a40] text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#292964] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
             
              {
                loading ?
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Sending...
                </> :
                <>
                  <FiSend />
                  Send  
                </>
              }
            
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EmailModal;
