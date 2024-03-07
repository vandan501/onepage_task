import React from "react";
import "./Footer.css"; // Make sure to replace with the correct path to your CSS file
import mainlogo from "../images/nav-logo.svg"
import locationIcon from "./Icons/location.svg";
import emailIcon from "./Icons/email.svg";
import callIcon from "./Icons/call.svg";


function Footer() {
  return (
    <>
      <footer>
        <a href="./index.html">
          <img src={mainlogo} alt="main-logo" />

        </a>
        <div className="footer-content">
          <div className="footer-part">
            <h2>Address</h2>
            <p className="flex">
              <img src={locationIcon} alt="" className="footer-icon" /> New
              Delhi, South Delhi, Delhi 110014
            </p>
          </div>
          <div className="footer-part">
            <h2>Contact</h2>
            <p className="flex">
              <img src={emailIcon} alt="" className="footer-icon" />
              contact@logicnotes.com
            </p>
            <p className="flex">
              <img src={callIcon} alt="" className="footer-icon" /> +91 99999
              99999
            </p>
          </div>
          <div className="footer-part">
            <h2>Social Media</h2>
            <div>
          
            <i className="fa-brands fa-linkedin-in"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-facebook-f"></i>
            </div>
          </div>
        </div>
        <p
          style={{
            textAlign: "right",
            marginRight: "20px",
            marginBottom: "10px",
          }}
        >
          Privacy Policy | Terms & Conditions
        </p>
      </footer>
    </>
  );
}

export default Footer;
