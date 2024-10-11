import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";

const index = ({toggleSidebar}) => {
  const router = useRouter();
  const userId = router.query._id;
  const handleLogout = async () => {
    try {
      const logout = await axios("/api/auth/logout");
      console.log(logout)
      logout && toast.success("Logout Successfully")
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // const [userData, setUserData] = useState({
  //   userName: "",
  //   email: "",
  //   name: "",
  // });
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`/api/auth/${userId}`, {
  //         method: "GET",
  //       });

  //       if (response.ok) {
  //         const userDataFromApi = await response.json();
  //         setUserData(userDataFromApi);
  //       } else {
  //         toast.error("Error fetching user data:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   // Fetch user data when the component mounts
  //   fetchUserData();
  // }, []);
  return (
    <>
      <div className="dashboard-sidebar">
        <Toaster/>
        <div className="dashboard-upper-sidebar">
        <div className="user-dashboard-name">
          <h2>Azka Rashid</h2>
        </div>
        <div className="user-dashboard-lists">
          <ul>
            <li>
              <i class="fa-solid fa-gauge fa-lg"></i>{" "}
              <Link style={{color:"white", zIndex:"99999999999999999999"}} href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <i class="fa-solid fa-blog fa-lg"></i>
              <Link href="/dashboard/uploadblogs">Upload Blogs</Link>
            </li>
            <li>
            <i class="fa-regular fa-address-book fa-lg"></i>
              <Link href="/dashboard/contactdetails">Contact Details</Link>
            </li>
            <li>
            <i class="fa-regular fa-newspaper fa-lg"></i>
              <Link href="/dashboard/subscribers">Subscribers</Link>
            </li>
            
            <li>
              <i class="fa-solid fa-right-from-bracket fa-lg"></i>
              <button onClick={handleLogout} style={{background : "none", border : "none", color : "white", fontSize : "20px"}}>Logout</button>
            </li>
          </ul>
        </div>
        </div>
        <div className="backward-arrow">
        <i class="fa-solid fa-arrow-left fa-lg" onClick={toggleSidebar}></i>
        </div>
      </div>
    </>
  );
};

export default index;
