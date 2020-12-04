import React from "react";
import "./PopupWithForm.css";
import Popup from "../Popup/Popup";

function popupWithForm(props) {
  return (
    <Popup name={props.name} title={props.title} isOpen={props.isOpen} onClose={props.onClose}>
      <form
        className={`form form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        action="#"
        method="GET"
        noValidate
      >
        {props.children}
      </form>
    </Popup>
  );
}

export default popupWithForm;
