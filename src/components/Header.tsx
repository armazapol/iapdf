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
  profile: userProfile
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


const Header = ({ routes, routesother, descriptions, profile, children }: Props) => {
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
    <div className="flex-1 flex flex-col h-full">
      {/* Header fijo */}
      <header className="flex justify-between items-center bg-white h-[80px] px-[40px] shrink-0">
        <div>
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
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

      {/* Contenido con scroll interno */}
      <main className="flex-1 overflow-y-auto bg-[#F9F6F2] px-10 py-6">
        {children}
        {showNotifications && (
          <Notifications onClose={() => setShowNotifications(false)} />
        )}
      </main>
    </div>
  );
};

export default Header;
