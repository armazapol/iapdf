"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      href: "/home/usermanagement",
      label: "User management",
      icon: "/svg/icons/configicon.svg",
      children: [
        {href: "/login", label: "users", icon: "/svg/icons/logouticon.svg" },
        {href: "/login", label: "view", icon: "/svg/icons/logouticon.svg" }
      ]
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

  return (
    <div className="flex h-screen font-sans text-gray-800 overflow-hidden">
      <aside className="w-64 mr-[7px] bg-white p-6 flex flex-col justify-between shadow-[7px_0_5px_-5px_rgba(0,0,0,0.3)]">
        {/* Logo y navegación */}
        <div>
          <div className="w-[400px] mb-[30px]">
            <img
              src="/img/logoLogin.png"
              alt="Portada Login"
              className="w-[180px]"
            />
          </div>
          <nav>
            <p className="text-xs font-semibold text-[#686868] mb-2 text-[14px]">
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
        <ul className="mb-6 space-y-2">
          {routesother.map(({ href, label, icon, children }) => (
            <li key={href}>
              {/* Ruta principal */}
              <Link
                href={href}
                className={`font-medium flex items-center h-[50px] ${
                  pathname === href ? "bg-[#B32646] text-white rounded-md" : ""
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

              {/* Subrutas (children) si existen */}
              {children && (
                <ul className="ml-4 mt-1 space-y-1">
                  {children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block text-sm px-3 py-1 rounded-md ${
                          pathname === child.href
                            ? "bg-[#B32646] text-white"
                            : ""
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </aside>

      <div className="flex-1 flex flex-col h-full">
        {/* Header fijo */}
        <header className="flex justify-between items-center bg-white h-[80px] px-[40px] shrink-0 ">
          <div>
            <h1 className="text-2xl font-bold">{pageTitle}</h1>
            <p className="text-gray-500">{pageDescription}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xl"></div>
            <div className="text-right">
              <strong>Angelica Jones</strong>
              <br />
              <span className="text-sm text-gray-500">Administrator</span>
            </div>
          </div>
        </header>

        {/* Contenido con scroll interno */}
        <main className="flex-1 overflow-y-auto bg-[#F9F6F2] px-10 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
