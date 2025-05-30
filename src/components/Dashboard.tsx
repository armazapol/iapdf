"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
  profile: {
    idUser: number;
    email: string;
    username: string;
    role: string;
  };
}

const Dashboard = ({ children, profile }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const routes = [
    { href: "/home", 
      label: "PDF to Excel", 
      icon: "/img/ImgPDF.png",  
      icon2: "/img/imgPDFinvert.png" 
    },
    {
      href: "/home/history",
      label: "History",
      icon: "/svg/icons/historyicon.svg",
      icon2: "/img/imgHistoryInvert.png"
    },
    {
      href: "/home/incidents",
      label: "Incidents",
      icon: "/svg/icons/incidentsicon.svg",
      icon2: "/img/imgIncidentsInvert.png"
    },
  ];

  const routesother = [
    {
      href: "/home/usermanagement/users",
      label: "User management",
      icon: "/svg/icons/configicon.svg",
      icon2: "/img/ajuste.png",
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
    <>
      <Sidebar routes={routes} routesother={routesother} showSidebar={showSidebar} />
      <Header
        routes={routes}
        routesother={routesother}
        profile={profile}
        descriptions={descriptions}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      >
        {children}
      </Header>
    </>
  );
};

export default Dashboard;
