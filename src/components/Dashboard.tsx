"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { routes, routesother, descriptions } from "@/utils";

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Sidebar routes={routes} routesother={routesother} showSidebar={showSidebar} />
      <Header
        routes={routes}
        routesother={routesother}
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
