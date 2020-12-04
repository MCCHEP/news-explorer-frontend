import { useState } from "react";
import './Header.css';
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <header className={`header ${props.currentPage === 'main' ? 'header_theme_main' : 'header_theme_saved-news'}`}>
      <div className={`header__menu-overlay ${!isButtonClicked ? 'header__menu-overlay_hidden' : ''}`}></div>
      <div className={`header__top-container 
      ${props.currentPage === 'main' ? 'header__top-container_theme_main' : 'header__top-container_theme_saved-news'} 
      ${isButtonClicked ? 'header__top-container_active' : ''}`}>
        <p className="header__text">NewsExplorer</p>
        <button onClick={handleClick} className={`header__menu-button  
        ${props.currentPage !== 'main' ? 'header__menu-button_light' : ' '} 
        ${isButtonClicked ? 'header__menu-button_active' : ''}`}></button>
        <div className={`header__menu-container ${!isButtonClicked ? 'header__menu-container_hidden' : ''}`}>
        <Navigation isMenuOpen={isButtonClicked} currentPage={props.currentPage} loggedIn={props.loggedIn} handleLogout={props.handleLogout} handleLogin={props.handleLogin}/>
        </div>
      </div>
      {props.children}
    </header>
  );
}

export default Header;
