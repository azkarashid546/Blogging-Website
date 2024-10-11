import React from "react";
import DashNavbar from "@/pages/components/dashboardNav/index";
import DashSidebar from "@/pages/components/dashboardsidebar/index";
import { useRouter } from "next/router";
const dashlayout = ({ children }) => {
  return (
    <>
      <div style={{border: "solid"}}>
        <div>
          <DashNavbar />
        </div>
        <div>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default dashlayout;
