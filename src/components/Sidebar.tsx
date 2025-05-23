"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import NeedHelp from "./NeedHelp";

interface Props {
  routes: Route[];
  routesother: RouteOther[];
  showSidebar: boolean;
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

const Sidebar = ({ routes, routesother, showSidebar }: Props) => {
  const pathname = usePathname();

  return (
    <aside
      className={`${
        showSidebar ? "flex" : "hidden"
      } lg:flex relative top-[70px] lg:top-0 w-[242px] mr-[7px] bg-white p-6 flex flex-col justify-between h-full md:shadow-[7px_0_5px_-5px_rgba(0,0,0,0.3)] pb-24 md:pb-0`}
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
                  pathname === href ? "bg-[#B32646] text-white rounded-md" : ""
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
            <Logout />
          </ul>
        </nav>
      </div>
      <div className="">
        <NeedHelp />
      </div>
    </aside>
  );
};

export default Sidebar;
