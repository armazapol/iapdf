"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Sidebar showSidebar={showSidebar} />
      <Header
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      >
        {children}
      </Header>
    </>
  );
};

export default Dashboard;
