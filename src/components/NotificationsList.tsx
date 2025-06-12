import { getNotifications } from "@/app/actions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import { useAuth } from "@/context/AuthContext";
import { parseFormatRelativeTime } from "@/utils/parseFormat";

interface Props{
  setNewNotifications : (arg0:boolean) => void;
}

interface Notification {
  idFile: number;
  idProcess: number;
  idUser: number;
  state: string;
  status: string;
  timestamp: string;
  relativeTime: string;
}

export default function NotificationsList({setNewNotifications}:Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { idUser } = useAuth();

  const urlBase = process.env.NEXT_PUBLIC_SOCKET_URL;

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getNotifications();
      const newResponse = response.map((data: Notification) => {
        return {
          ...data,
          relativeTime: parseFormatRelativeTime(data.timestamp),
        };
      });
      setNotifications(newResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`${urlBase}/ws/${idUser}`);
    wsRef.current = ws;
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onclose = () => {
      console.log("disconnected");
    };

    ws.onmessage = (event) => {
      console.log(event);
      if (!event.data.includes("Conectado correctamente")) {
        setNewNotifications(true)
        const data = JSON.parse(event.data);
        const dataPayload = {
          ...data,
          relativeTime: parseFormatRelativeTime(data.timestamp),
        };

        const filterNotifications = notifications.filter(
          (data) => data.idFile === dataPayload.idFile
        );
        //si es que existe el archivo en proceso eliminarlo
        if (filterNotifications.length === 1) {
          const newNotifications = notifications.filter(
            (data) => data.idFile !== dataPayload.idFile
          );
          return setNotifications([dataPayload, ...newNotifications]);
        } else {
          //setear una nueva notificación
          setNotifications((state) => [dataPayload, ...state]);
        }

    
      }
    };
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(`{"event":"ping"}`);
      }
    }, 29000);

    return () => {
      clearInterval(pingInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [notifications]);

  // useEffect(() => {
  //   console.log(notifications);
  // }, [notifications]);

  if (isLoading) {
    return <LoadingComponent size="sm" />;
  }

  if (notifications.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No notifications found</p>
      </div>
    );
  }

  return (
    <>
      {notifications.map((noti) => (
        <div
          key={noti.idFile}
          className=" flex gap-5 p-3 md:pl-[22px] items-center md:py-[26px] border-b-[1px] border-gray-100 "
        >
          <div className="flex flex-1 gap-2 md:gap-5">
            <div className="flex items-center justyfy-center">
              {noti.status === "PROCESS_SUCCESS" ? (
                <span className=" w-2 h-2 bg-green-400 rounded-full" />
              ) : noti.status === "PROCESSING" ? (
                <span className=" w-2 h-2 bg-yellow-400 rounded-full" />
              ) : (
                <span className=" w-2 h-2 bg-red-400 rounded-full" />
              )}
              {/* <Image
                src={
                  noti.status === "PROCESS_SUCCESS"
                    ? "/img/circle-noti.png"
                    : "/img/circle-noti2.png"
                }
                alt="Estate notification"
                width={10}
                height={10}
              /> */}
            </div>
            <div className="flex items-center justify-center">
              <Image
                src={
                  noti.status === "PROCESS_SUCCESS"
                    ? "/img/file-notification.png"
                    : noti.status === "PROCESSING"
                    ? "/img/file-notification4.png"
                    : "/img/file-notification3.png"
                }
                alt="File notification"
                width={40}
                height={40}
              />
            </div>

            <div className="flex flex-col gap-2 break-words flex-1">
              <p className="text-[16px] font-medium leading-[100%] text-[#000000] ">
                {noti.status === "PROCESS_SUCCESS"
                  ? "File converted"
                  : noti.status === "PROCESSING"
                  ? "Pending document"
                  : "Oops there was an error"}
                {/* File converted */}
              </p>
              <p className="font-normal text-[14px] leading-[100%] text-[#7F7F7F]">
                {noti.status === "PROCESS_SUCCESS"
                  ? "Your file has been successfully converted."
                  : noti.status === "PROCESSING"
                  ? "The document you uploaded is in queue and awaiting processing."
                  : "There was an error uploading your files, please try again."}
                {/* Description {noti.idFile} */}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end relative gap-2 ">
            <Image
              src="/img/eye-noti.png"
              alt="view notification"
              width={20}
              height={20}
              className="relative cursor-pointer"
            />
            <p className="font-medium text-[12px] leading-[100%] text-[#7F7F7F]">
              {noti.relativeTime}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
