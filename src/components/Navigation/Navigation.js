import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import logoPath from "../../images/logout-bt.svg";
import blackLogoPath from "../../images/logout-bt-bl.svg";
import "./Navigation.css";

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const mainLinkClassName = (
    `nav__link ${
      props.currentPage === "main"
        ? "nav__link_active"
        : "nav__link_theme_white"
    }`
  );
  const savedNewsLinkClassName = (
    `nav__link ${
      props.currentPage === "saved-news"
        ? " nav__link_theme_white_active"
        : ""
    }`
  );
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link
            className={mainLinkClassName}
            to="/"
          >
            Главная
          </Link>
        </li>
        <li
          className={`nav__list-item ${
            !props.loggedIn ? "nav__list-item_hidden" : ""
          }`}
        >
          <Link
            className={savedNewsLinkClassName}
            to="/saved-news"
          >
            Сохраненные статьи
          </Link>
        </li>
        <li
          className={`nav__list-item nav__list-item_button-container ${
            !props.loggedIn ? "nav__list-item_hidden" : "nav__list-item_last"
          }`}
        >
          <button
            className={`nav__button ${
              props.currentPage === "saved-news"
                ? " nav__button_theme_white"
                : ""
            }`}
            onClick={props.handleLogout}
          >
            <span>{currentUser.name}</span>
            <img
              className="nav__button-icon"
              src={(props.currentPage !== "main") && !props.isMenuOpen ? blackLogoPath : logoPath}
              alt=""
            />
          </button>
        </li>
        <li
          className={`nav__list-item nav__list-item_button-container ${
            props.loggedIn ? "nav__list-item_hidden" : "nav__list-item_last"
          }`}
        >
          <button className="nav__button" onClick={props.handleLogin}>
            <span>Авторизоваться</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
