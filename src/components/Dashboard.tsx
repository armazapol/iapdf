"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const Dashboard = ({ children }: Props) => {
  const isMobile = useIsMobile()
  const pathName = usePathname()
  const [showSidebar, setShowSidebar] = useState(false);


  useEffect(() => {
    setShowSidebar(isMobile ? false : true)
  }, [isMobile])

  useEffect(() => {
    if(isMobile){
      setShowSidebar(false)
    }
  }, [pathName])
  
  
  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
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
