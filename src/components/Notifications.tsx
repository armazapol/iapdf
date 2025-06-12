import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NotificationsList from "./NotificationsList";

type NotificationsProps = {
  show: boolean;
  onClose: () => void;
  setNewNotifications:  (arg0: boolean) => void
};

export default function Notifications({ onClose, show, setNewNotifications }: NotificationsProps) {
  const router = useRouter();

  const handleGoToIncidents = () => {
    router.push("/home/incidents");
    onClose();
  };
  

  return (
    <div
      className={`${show ? "block" : "hidden"}  z-10 w-full md:w-[460px] right-0 left-0 md:left-auto md:right-[20px] lg:right-[190px] h-[400px]  md:h-[420px] rounded-[8px]  bg-[#FFFFFF] fixed md:absolute top-[68px] md:top-[0px] border border-[#E1E4EA]`}
      style={{ boxShadow: "2px 8px 24px 1px #0000001F" }}
    >
      <div className="flex justify-between items-center bg-[#FBFBFB] h-[44px] p-[18px] px-[22px] mb-3 rounded-[8px]">
        <p className="text-[16px] font-medium leading-[24px] tracking-[-0.011em]">
          Notifications
        </p>
        <Image
          src="/img/close.png"
          alt="s"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div className="mx-3">
        <div className="overflow-y-auto  max-h-[279px] h-[279px]">
          <NotificationsList setNewNotifications={setNewNotifications} />
        </div>
      </div>

      <div className="left-[89px]  md:left-[110px] relative mt-[18px] pb-3">
        <button
          onClick={handleGoToIncidents}
          className="w-[129px] h-[28px] rounded-[6px] bg-[#2E3A59] hover:bg-[#292964] text-[#FFFFFF] font-medium text-[14px] leading-[20px] tracking-[-0.006em] cursor-pointer"
        >
          Go to incidents
        </button>
      </div>
    </div>
  );
}
