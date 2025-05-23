"use client";

import NeedHelp from "@/components/NeedHelp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Notifications from "@/components/Notifications";
import { useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const routes = [
    { href: "/home", label: "PDF to Excel", icon: "/svg/icons/pdficon.svg" },
    {
      href: "/home/history",
      label: "History",
      icon: "/svg/icons/historyicon.svg",
    },
    {
      href: "/home/incidents",
      label: "Incidents",
      icon: "/svg/icons/incidentsicon.svg",
    },
  ];

  const routesother = [
    {
      href: "/home/usermanagement/users",
      label: "User management",
      icon: "/svg/icons/configicon.svg",
      children: [
        {
          href: "/home/usermanagement/users",
          label: "View users",
          icon: "/img/arrow2.png",
        },
        {
          href: "/home/usermanagement/roles",
          label: "View roles",
          icon: "/img/arrow2.png",
        },
      ],
    },
    { href: "/login", label: "Logout", icon: "/svg/icons/logouticon.svg" },
  ];

  const descriptions: Record<string, string> = {
    "/home": "Upload your PDFs to convert them to Excel.",
    "/home/history": "View previous conversions.",
    "/home/incidents": "Track and manage issues.",
    "/home/usermanagement": "Manage user permissions and roles.",
    "/login": "Sign out of your account.",
  };

  const allRoutes = [...routes, ...routesother];
  const currentRoute = allRoutes.find((r) => r.href === pathname);
  const pageTitle = currentRoute?.label || "Dashboard";
  const pageDescription = descriptions[pathname] || "";

  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex h-screen font-sans text-gray-800 overflow-hidden ">
      {/* Mobile */}
      <div className="absolute w-full lg:hidden">
        <div className=" lg:w-full h-[70px] flex items-center p-6 justify-between bg-[#FFFFFF]  ">
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
      {/*  */}
      <aside
        className={`${
          showSidebar ? "block" : "hidden"
        } lg:block relative top-[70px] lg:top-0 w-[242px] mr-[7px] bg-white p-6 flex flex-col justify-between h-full md:shadow-[7px_0_5px_-5px_rgba(0,0,0,0.3)]`}
      >
        <div className="fixed inset-0 z-10 flex bg-black/40 lg:hidden top-[70px] left-[242px] "></div>
        {/* Logo y navegación */}
        <div className="">
          <div className="hidden lg:w-[400px] mb-[30px] lg:block">
            <Image
              src="/img/logoLogin.png"
              alt="Portada Login"
              className="w-[180px]"
              width={180}
              height={43}
            />
          </div>
          <nav className="">
            <p className="text-xs font-semibold text-[#686868] mb-6 text-[14px] lg:mb-2 ">
              MAIN MENU
            </p>
            <ul className="mb-6 space-y-2">
              {routes.map(({ href, label, icon }) => (
                <li
                  key={href}
                  className={`font-medium flex items-center h-[50px] ${
                    pathname === href
                      ? "bg-[#B32646] text-white rounded-md"
                      : ""
                  }`}
                >
                  <Link
                    href={href}
                    className={`flex items-center space-x-2 px-5 py-1 ${
                      pathname === href ? "text-white" : "text-gray-600"
                    }`}
                  >
                    <img
                      src={icon}
                      alt={label}
                      className={`w-4 h-4 mr-2 ${
                        pathname === href ? "invert brightness-200" : ""
                      }`}
                    />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-xs font-semibold text-[#686868] mb-2 text-[14px]">
              OTHER
            </p>
            <ul className="mb-6 mt-5 space-y-2">
              {routesother.map(({ href, label, icon, children }) =>
                children ? (
                  <details
                    key={href}
                    open={children.some((child) => pathname === child.href)}
                    className="group flex flex-col gap-4"
                  >
                    <summary
                      className={`font-medium flex items-center h-[50px] cursor-pointer py-1 rounded-md gap-3 group-open:text-[#B32646] text-[16px] w-[194px] 
                      `}
                    >
                      <img
                        src={icon}
                        alt={label}
                        className="w-4 h-4 mr-2 group-open:hidden"
                      />
                      <img
                        src="/img/ajuste.png"
                        alt={label}
                        className="w-4 h-4 mr-2 hidden group-open:block"
                      />

                      <span className="w-[130px]">{label}</span>
                      <Image
                        src="/img/desplegable.png"
                        alt="Desplegable"
                        width={10}
                        height={10}
                        className=" opacity-0 group-open:opacity-100"
                      />
                    </summary>
                    <ul className="mt-1 space-y-1">
                      {children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`text-sm px-3 py-1 rounded-md flex h-[40px] items-center gap-2 w-[156px] ${
                              pathname === child.href
                                ? "bg-[#B32646] text-white"
                                : ""
                            }`}
                          >
                            <img
                              src={
                                pathname === child.href
                                  ? child.icon
                                  : "/img/arrow.png"
                              }
                              alt={child.label}
                              className="w-4 h-4 mr-2"
                            />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`font-medium flex items-center h-[50px]  py-1 rounded-md ${
                        pathname === href
                          ? "bg-[#B32646] text-white"
                          : "text-gray-600"
                      }`}
                    >
                      <img src={icon} alt={label} className="w-4 h-4 mr-2" />
                      <span className="pl-2.5">{label}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
        <div className="hidden lg:block">
          <NeedHelp />
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full">
        {/* Header fijo */}
        <header className="hidden md:flex justify-between items-center bg-white h-[80px] px-[40px] shrink-0 ">
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
            <div className="text-xl">
              <Image src="/img/userLogo.png" alt="" width={48} height={48} />
            </div>
            <div className="">
              <strong>Angelica Jones</strong>
              <br />
              <span className="text-sm text-gray-500">Administrator</span>
            </div>
          </div>
        </header>

        {/* Contenido con scroll interno */}
        <main className="relative top-[70px] md:top-0 md:flex-1 overflow-y-auto bg-[#F9F6F2] px-2 md:px-10 py-6">
          {children}
          {showNotifications && (
            <Notifications onClose={() => setShowNotifications(false)} />
          )}
        </main>
      </div>
    </div>
  );
}
