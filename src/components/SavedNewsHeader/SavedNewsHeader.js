import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedNewsHeader.css";

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);
    return (
           <div className="saved-news-header">
            <p className="saved-news-header__title">Сохранённые статьи</p>
            <h1 className="saved-news-header__main-info">{currentUser.name}, у вас {props.numberOfSaved} {props.numberOfSaved % 10 === 1 ? 'сохранённая статья' : 'сохранённых статей'}</h1>
            {props.children}
          </div>
    );
  }
  
  export default SavedNewsHeader;