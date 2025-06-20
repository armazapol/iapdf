"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Notifications from "./Notifications";
import User from "./User";
import { routes, routesother, descriptions } from "@/utils";
import Link from "next/link";

interface Props {
  children: React.ReactNode;

  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Header = ({ children, showSidebar, setShowSidebar }: Props) => {
  const [newNotifications, setNewNotifications] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const subRoutePathname = pathname.split("/").slice(0, 3).join("/");
  const subRoutePathname2 = pathname.split("/").slice(0, 4).join("/");

  const getTitle = () => {
    if (
      currentRoute?.label &&
      Object.hasOwn(currentRoute, "children") === false
    ) {
      return currentRoute.label;
    } else if (currentSubRoute?.label) {
      return currentSubRoute.label;
    } else if (currentSubRoute2?.label) {
      return currentSubRoute2.label;
    } else {
      return "Dashboard";
    }
  };
  const allRoutes = [...routes, ...routesother[0].children];
  const currentRoute = allRoutes.find((r) => r.href === pathname);
  const currentSubRoute = allRoutes.find((r) => r.href === subRoutePathname);
  const currentSubRoute2 = allRoutes.find((r) => r.href === subRoutePathname2);
  const pageTitle = getTitle();
  const pageDescription =
    descriptions[pathname] || descriptions[subRoutePathname] || "";

  const toggleNotifications = () => {
    if (newNotifications && !showNotifications) {
      setNewNotifications(false);
    }
    setShowNotifications(!showNotifications);
  };
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
            <Link 
              href="/home"
            >
        
            <Image
              src="/img/logoLogin.png"
              alt="Portada Login"
              className="w-[180px]"
              width={180}
              height={43}
            />
                </Link>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <div className="relative">
                {newNotifications && (
                  <span className="rounded-full w-3 h-3 bg-[#B32646] absolute z-50 right-0" />
                )}
                <Image
                  src={"/svg/icons/notifications.svg"}
                  alt=""
                  width={25}
                  height={25}
                  onClick={toggleNotifications}
                  className={`cursor-pointer invert ${
                    showNotifications && "brightness-[#2E3A59]"
                  } `}
                />
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
            <div className="relative">
              {newNotifications && (
                <span className="rounded-full w-3 h-3 bg-[#B32646] absolute z-50 right-0" />
              )}
              <Image
                src={"/svg/icons/notifications.svg"}
                alt=""
                width={25}
                height={25}
                onClick={toggleNotifications}
                className={`cursor-pointer invert ${
                  showNotifications && "brightness-[#2E3A59]"
                } `}
              />
              {/* {showNotifications ? (
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
              )} */}
            </div>
            <User />
          </div>
        </header>
        <div className="block md:hidden bg-white mt-[70px] p-5 ">
          <h1 className="text-2xl font-bold text-[#B32646] ">{pageTitle}</h1>
          <p className="text-gray-500">{pageDescription}</p>
        </div>
        {/* Contenido con scroll interno */}
        <main className="relative md:flex-1 overflow-y-auto bg-[#F9F6F2] px-5 md:px-10 py-6 h-full">
          {children}
          <Notifications
            show={showNotifications}
            setNewNotifications={setNewNotifications}
            onClose={() => setShowNotifications(false)}
          />

          {/* <Notifications onClose={() => setShowNotifications(false)} /> */}
        </main>
      </div>
    </>
  );
};

export default Header;
