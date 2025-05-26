"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Notifications from "./Notifications";
import User from "./User";
import { userProfile } from "@/types";

interface Props {
  routes: Route[];
  routesother: RouteOther[];
  descriptions: Record<string, string>;
  children: React.ReactNode;
  profile: userProfile;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

interface Route {
  href: string;
  label: string;
  icon: string;
}

interface RouteOther {
  href: string;
  label: string;
  icon: string;
  children: {
    href: string;
    label: string;
    icon: string;
  }[];
}

const Header = ({
  routes,
  routesother,
  descriptions,
  profile,
  children,
  showSidebar,
  setShowSidebar,
}: Props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  const pathname = usePathname();
  const allRoutes = [...routes, ...routesother];
  const currentRoute = allRoutes.find((r) => r.href === pathname);
  const pageTitle = currentRoute?.label || "Dashboard";
  const pageDescription = descriptions[pathname] || "";
  return (
    <>
      <div className="absolute w-full lg:hidden">
        <div className=" lg:w-full h-[70px] flex items-center p-5 justify-between bg-[#FFFFFF]  ">
          <div className="flex gap-2 items-center">
            <button
              className="items-center lg:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? (
                <div className="w-[24px]">
                  <Image
                    src="/img/close-menu.png"
                    alt="Close menú"
                    className="cursor-pointer"
                    width={16}
                    height={16}
                  />
                </div>
              ) : (
                <Image
                  src="/img/hamburger.png"
                  alt="Abrir menú"
                  className="cursor-pointer"
                  width={24}
                  height={24}
                />
              )}
            </button>
            <Image
              src="/img/logoLogin.png"
              alt="Portada Login"
              className="w-[180px]"
              width={180}
              height={43}
            />
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <div>
                {showNotifications ? (
                  <Image
                    src="/img/notification-open.png"
                    alt=""
                    width={30}
                    height={30}
                    onClick={toggleNotifications}
                    className="cursor-pointer"
                  />
                ) : (
                  <Image
                    src="/img/notification.png"
                    alt="Notification Mobil"
                    className="cursor-pointer"
                    onClick={toggleNotifications}
                    width={27}
                    height={27}
                  />
                )}
              </div>
              <Image
                src="/img/logo-user.png"
                alt="Portada Login"
                className=""
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full w-full">
        {/* Header fijo */}
        <header className="hidden md:flex justify-between items-center bg-white h-[80px] px-[20px] shrink-0 ">
          <div>
            <h1 className="text-2xl font-bold text-[#B32646] ">{pageTitle}</h1>
            <p className="text-gray-500">{pageDescription}</p>
          </div>
          <div className="flex items-center space-x-4 pr-[20px] ">
            <div>
              {showNotifications ? (
                <Image
                  src="/img/notification-open.png"
                  alt=""
                  width={30}
                  height={30}
                  onClick={toggleNotifications}
                  className="cursor-pointer"
                />
              ) : (
                <Image
                  src="/img/notification.png" // imagen cuando está cerrado
                  alt="Notificaciones cerradas"
                  width={30}
                  height={30}
                  onClick={toggleNotifications}
                  className="cursor-pointer"
                />
              )}
            </div>
            <User profile={profile} />
          </div>
        </header>
        <div className="block md:hidden bg-white mt-[70px] p-5 ">
          <h1 className="text-2xl font-bold text-[#B32646] ">{pageTitle}</h1>
          <p className="text-gray-500">{pageDescription}</p>
        </div>
        {/* Contenido con scroll interno */}
        <main
         className="relative md:flex-1 overflow-y-auto bg-[#F9F6F2] px-5 md:px-10 py-6 h-full"
         >
          {children}
          {showNotifications && (
            <Notifications onClose={() => setShowNotifications(false)} />
          )}
        </main>
      </div>
    </>
  );
};

export default Header;
