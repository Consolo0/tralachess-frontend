import React, { useState } from "react";
import { Link } from "react-router-dom";
import HamburgerIcon from "./HamburgerIcon/HamburgerIcon.jsx";
import "./VerticalNavbar.css";

function VerticalNavbar() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const InvertIsButtonPressed = ()=>{
    setIsButtonPressed(!isButtonPressed);
  }

  return(
    <div className="vertical-navbar">
      {isButtonPressed 
      ? 
        <div className="custom-menu">
          <div className="menu-header">Menu</div>
          <Link className="custom-link" to="/">⌂ Home</Link>
          <Link className="custom-link" to="/how-to-play">? How to Play</Link>
          <Link className="custom-link" to="/about-us">ℹ About Us</Link>
          <div className="custom-link back-link" onClick={InvertIsButtonPressed}>❮ Back</div>
        </div>
      : 
      <HamburgerIcon isPressed={InvertIsButtonPressed} />
      }
    </div>
  )
}

export default VerticalNavbar;
