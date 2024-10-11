import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";

const Index = ({ toggleSidebar }) => {
  // const router = useRouter();
  // const userId = router.query._id;
  // const [userData, setUserData] = useState({
  //   userName: "",
  //   email: "",
  //   name: "",
  // });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`/api/auth/${userId}`);
  //       if (response.status === 200) {
  //         setUserData(response.data);
  //       } else {
  //         toast.error(`Error fetching user data: ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       toast.error("Error fetching user data");
  //     }
  //   };

  //   if (userId) {
  //     fetchUserData();
  //   }
  // }, [userId]);

  const handleLogout = async () => {
    try {
      const logout = await axios.post("/api/auth/logout");
      if (logout.status === 200) {
        toast.success("Logout Successfully");
        router.push("/login");
      } else {
        toast.error("Error logging out");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  };

  return (
    <>
      <div className="dashboard-navbar">
        <Toaster />
        <nav>
          <div className="dashboard-nav">
            <div className="dashboard-sidebar-icon">
              <i className="fa-solid fa-bars fa-2xl" onClick={toggleSidebar}></i>
            </div>
            <div className="dashboard-sidebar-profile">
             <i className="fa-solid fa-angle-down"></i>
              <div className="dropdown-content">
               
              
                <p>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    Logout
                  </button>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Index;
