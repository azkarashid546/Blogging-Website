import React, { useState } from "react";
import Link from "next/link";

const index = () => {

  const [category, setCategory] = useState('');

  const handleSearch = async(e) => {
    e.preventDefault()
    // Redirect to the search page with the specified category
    window.location.href = `/search?category=${category}`;
  };
  const [mobNavOpen, setMobNavOpen] = useState(false);

  const toggleSidebar = () => {
    setMobNavOpen(!mobNavOpen);
  };
  const handleCloseSidebar = () => {
    setMobNavOpen(false);
  };
  return (
    <>
    
        <div className="header">
          <nav className="top-nav">
            <div className="left-nav">
              <ul>
                <li>azkarashid196@gmail.com</li>
                <li>03055358098</li>
              </ul>
            </div>
            <div className="right-nav">
              <ul>
                <li>
                  <button>
                    <Link href="/login">Login</Link>
                  </button>
                </li>
                <li>
                  <button>
                    <Link href="/contactus">Contact Us</Link>
                  </button>
                </li>

              </ul>
            </div>
          </nav>
          <hr />
        <div className="sticky-navbar">
        <nav className="bottom-nav">
            <div className="mobile-left-nav">
              <div className="side-navbar">
                <div className="side-navbar-icons">
                  <i className="fa-solid fa-bars fa-2xl" onClick={toggleSidebar}></i>
                </div>
              </div>
              <div className="left-nav">
                <img src={"/assets/navbar/Logo.webp"} alt="Bold Blog" />
              </div>
            </div>

            <div className="center-nav">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
               
               
              </ul>
            </div>
            <div className="right-nav">
              <div className="searchbar">
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}/>
                <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
                </div>
              </div>
            </div>
          </nav>
        </div>
          
        </div>
        <div  className={`mobNav ${mobNavOpen ? "open" : ""}`}>
          <nav>
            <div className="logoAndCancelBtn">
              <div className="logoDiv">
              <img src={"/assets/navbar/Logo.webp"} alt="Bold Blog" />
              </div>
              <div className="cancelDiv">
                <i className="fa-solid fa-xmark fa-lg" onClick={handleCloseSidebar}></i>
              </div>
            </div>
            <ul className="mob-items">
              <li className="mob-item">
                <Link className="navLink" href="/" onClick={handleCloseSidebar}> 
                  Home
                </Link>
              </li>
              <li className="mob-item">
                <Link className="navLink" href="/about" onClick={handleCloseSidebar}>
                  About
                </Link>
              </li>

         

              

              <li className="mob-item">
                <button>
                  <Link href="/login" onClick={handleCloseSidebar}>Login</Link>
                </button>
              </li>
              <li className="mob-item">
                <button>
                  <Link href="/contactus" onClick={handleCloseSidebar}>Contact Us</Link>
                </button>
              </li>
            </ul>
          </nav>
        </div>
    </>
  );
};

export default index;
