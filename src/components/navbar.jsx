import React, { useState } from "react";
import { Link } from "react-router-dom";
import LanguageSelector from "./languageSelector";
import { useTranslation } from "react-i18next";
import '../styles/navbar.css';

const Navbar = () => {

  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="homeTitle"><ion-icon name="home-outline" size="large"></ion-icon></Link>

      <div className={`menu-icon ${isMobile ? 'open' : ''}`} onClick={handleToggle}>
        {isMobile ? (
          <ion-icon name="close-outline" size="large"></ion-icon> 
        ) : (
            <ion-icon name="menu-outline" size="large"></ion-icon>
        )}
      </div>

      <div className={`nav-links ${isMobile ? 'open' : ''}`}>
      <hr className="hrMobile"></hr>
        <Link to="/addtraining" onClick={handleToggle} >{t('addWorkouts')}</Link>
        <hr className="hrMobile"></hr>
        <Link to="/workouts" onClick={handleToggle} className="lastLinkNavbar">{t('myWorkouts')}</Link>
        <hr className="hrMobile"></hr>
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
