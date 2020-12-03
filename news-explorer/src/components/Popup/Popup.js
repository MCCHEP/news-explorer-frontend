import React from 'react';
import "./Popup.css";

function Popup(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <div className="popup__content">
        <h3 className={`popup__title ${props.name === 'successPopup' ? 'popup__title_success' : ''}`}>{props.title}</h3>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
