"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { routes, routesother, descriptions } from "@/utils";

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
