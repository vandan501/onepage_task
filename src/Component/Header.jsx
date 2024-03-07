import "./Header.css";
import React from "react";
import logo from "../images/nav-logo.svg";
import userImageIcon from "../images/gg_profile.png";
import selectArrow from "../images/Vector 49.png";

function Header() {
  const currentUser = "Vishal Patel";
  return (
    <>
      <nav className="nav-bar">
        <a href="./index.html">
          <div className="nav-logo">
            <img alt="img" src={logo} className="absolute top-0 left-0" />
          </div>
        </a>
        <div className="absolute right-8 flex justify-center items-center gap-2">
          <img src={userImageIcon} alt="" />
          <p>{currentUser}</p>
          <img src={selectArrow} alt="" />
        </div>
      </nav>
    </>
  );
}

export default Header;
