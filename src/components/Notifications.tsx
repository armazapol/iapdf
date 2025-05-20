
import React from 'react';
import Image from "next/image"

type NotificationsProps = {
  onClose: () => void;
};

export default function Notifications({onClose}:NotificationsProps) { 

  const notification = [
    { id: "1", estado:"/img/circle-noti.png", file: "/img/file-notification.png", title: "File converted", description: "You file has been sucessfuly converted" },
    { id: "2", estado:"/img/circle-noti2.png",  file: "/img/file-notification2.png", title: "File converted", description: "You file has been sucessfuly converted" },
    { id: "3", estado:"/img/circle-noti2.png",  file: "/img/file-notification3.png", title: "File converted", description: "There was an error uploading your files, please try again." },
    { id: "3", estado:"/img/circle-noti2.png",  file: "/img/file-notification3.png", title: "File converted", description: "You file has been sucessfuly converted" }
  ]  

  
  return (
    <div className="w-[460px] h-[420px] rounded-[8px]  bg-[#FFFFFF] absolute top-[80px] right-[109px] border border-[#E1E4EA]" style={{ boxShadow: '2px 8px 24px 1px #0000001F' }} >
        <div className="flex justify-between items-center bg-[#FBFBFB] h-[44px] p-[18px] px-[22px] mb-3 rounded-[8px]">
            <p className="text-[16px] font-medium leading-[24px] tracking-[-0.011em]">Notifications</p>
            <Image
                src="/img/close.png"
                alt="s"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={onClose}
            />
        </div>
        <div>
            <div className="overflow-y-auto  max-h-[279px]">
                { notification.map(noti => (
                    <div key={noti.id} className=" flex gap-5 p-3 pl-[22px] items-center py-[26px] pr-0 border-t-[1px] border-gray-300 first:border-t-[0px] ">
                        <Image
                            src={noti.estado}
                            alt="Estate notification"
                            width={10}
                            height={10}
                        />
                        <Image
                            src={noti.file}
                            alt="File notification"
                            width={40}
                            height={40}
                        />
                        <div className="flex flex-col gap-2 break-words w-[246px]">
                            <p className="text-[16px] font-medium leading-[100%] text-[#000000] ">{noti.title}</p>
                            <p className="font-normal text-[14px] leading-[100%] text-[#7F7F7F]">{noti.description}</p>
                        </div>
                        <div className="flex flex-col items-end bottom-[18px] relative left-[28px] gap-2 ">
                            <Image 
                                src="/img/eye-noti.png"
                                alt="view notification"
                                width={20}
                                height={20}
                                className="relative cursor-pointer"
                            />
                            <p className="font-medium text-[12px] leading-[100%] text-[#7F7F7F]">1 day</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
        
        <div className="left-[110px] relative mt-[18px] pb-3" >
            <button className="w-[129px] h-[28px] rounded-[6px] bg-[#2E3A59] text-[#FFFFFF] font-medium text-[14px] leading-[20px] tracking-[-0.006em] cursor-pointer">
            Go to incidents
            </button>
        </div>
    </div>
  )
}
