import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="homeTitle">HOME</Link>

      <div className={`menu-icon ${isMobile ? 'open' : ''}`} onClick={handleToggle}>
        {isMobile ? (
          <ion-icon name="close-outline"></ion-icon> 
        ) : (
            <ion-icon name="menu-outline"></ion-icon>
        )}
      </div>

      <div className={`nav-links ${isMobile ? 'open' : ''}`}>
      <hr className="hrMobile"></hr>
        <Link to="/addtraining" onClick={handleToggle} ><ion-icon name="add-outline"></ion-icon> Add Training</Link>
        <hr className="hrMobile"></hr>
        <Link to="/workouts" onClick={handleToggle} className="lastLinkNavbar"><ion-icon name="barbell-outline"></ion-icon> My Workouts </Link>
      </div>
    </nav>
  );
};

export default Navbar;
