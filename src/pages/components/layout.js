import React, { useState } from "react";
import Navbar from "@/pages/components/navbar";
import Footer from "@/pages/components/footer";
import DashboardSidebar from "@/pages/components/dashboardsidebar";
import DashboardNavbar from "@/pages/components/dashboardNav";
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useTheme } from '@/contexts/themeContext';

const layout = ({ children }) => {
  const { pathname } = useRouter();

  const restrictedPath = pathname.startsWith("/dashboard");
  // console.log(restrictedPath)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const { theme } = useTheme();
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  return (
    <div>
      {/* {pathname.startsWith("/dashboard") ? "" :  <Navbar /> }
      {children}
      {pathname.startsWith("/dashboard") ? "" :  <Footer /> } */}

      <div>
        {restrictedPath ? (
          <>
            <div style={{ display: "flex" }}>
              <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <DashboardSidebar toggleSidebar={toggleSidebar}/>
              </div>

              <div style={{ padding: "20px", width: "100%" }}>
                <div>
                  <DashboardNavbar toggleSidebar={toggleSidebar} />
                </div>
                <div>{children}</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default layout;

