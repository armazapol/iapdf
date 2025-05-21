import Sidebar from "@/components/Sidebar";
import { getUser } from "../actions";
import Header from "@/components/Header";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUser();

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
    // { href: "/login", label: "Logout", icon: "/svg/icons/logouticon.svg" },
  ];

  const descriptions: Record<string, string> = {
    "/home": "Upload your PDFs to convert them to Excel.",
    "/home/history": "View previous conversions.",
    "/home/incidents": "Track and manage issues.",
    "/home/usermanagement": "Manage user permissions and roles.",
    // "/login": "Sign out of your account.",
  };

  return (
    <div className="flex h-screen font-sans text-gray-800 overflow-hidden">
      <Sidebar routes={routes} routesother={routesother} />
      <Header
        routes={routes}
        routesother={routesother}
          profile={profile}
        descriptions={descriptions}
      >
        {children}
      </Header>
      {/* <div className="flex-1 overflow-y-auto">{children}</div> */}
    </div>
  );
}
