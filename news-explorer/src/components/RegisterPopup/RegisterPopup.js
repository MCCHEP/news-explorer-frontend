import React from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

function RegisterPopup(props) {
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");
  const [regName, setRegName] = React.useState("");
  const [emailRegError, setEmailRegError] = React.useState("");
  const [passwordRegError, setPasswordRegError] = React.useState("");
  const [nameRegError, setNameRegError] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleEmailChange = (e) => {
    setRegEmail(e.target.value);
    checkInputValidity();
  };

  const handlePasswordChange = (e) => {
    setRegPassword(e.target.value);
    checkInputValidity();
  };

  const handleNameChange = (e) => {
    setRegName(e.target.value);
    checkInputValidity();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClose();
    props.onSubmit();
    setEmailRegError("");
    setPasswordRegError("");
    setRegEmail("");
    setRegPassword("");
  };

  const checkInputValidity = () => {
    const emailInp = document.getElementById("regEmail-input");
    const passwordInp = document.getElementById("regPassword-input");
    const nameInp =  document.getElementById("regName-input");
    if (!emailInp.checkValidity() && emailInp.value !== "") {
      setEmailRegError(emailInp.validationMessage);
      setIsDisabled(true);
    } else {
      setEmailRegError("");
    }
    if (!passwordInp.checkValidity() && passwordInp.value !== "") {
      setPasswordRegError(passwordInp.validationMessage);
      setIsDisabled(true);
    } else {
      setPasswordRegError("");
    }

    if (!nameInp.checkValidity() && nameInp.value !== "") {
      setNameRegError(nameInp.validationMessage);
      setIsDisabled(true);
    } else {
      setNameRegError("");
    }
    
    if (emailInp.checkValidity() && passwordInp.checkValidity() && nameInp.checkValidity()) {
      setIsDisabled(false);
    }
  };


  return (
    <PopupWithForm
      name="reg"
      title="Регистрация"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
      <span className="form__label-text">Email</span>
        <input
          name="regEmail"
          id="regEmail-input"
          className="form__input form__input_type_email"
          type="email"
          placeholder="Введите почту"
          minLength="2"
          maxLength="40"
          value={regEmail}
          onChange={handleEmailChange}
          required
        />
        <span id="regEmail-input-error" className="form__input-error">{emailRegError}</span>
      </label>
      <label className="form__label">
      <span className="form__label-text">Пароль</span>
        <input
          name="regPassword"
          id="regPassword-input"
          className="form__input form__input_type_password"
          type="password"
          placeholder="Введите пароль"
          minLength="2"
          maxLength="200"
          value={regPassword}
          onChange={handlePasswordChange}
          required
        />
        <span
          id="regPassword-input-error"
          className="form__input-error"
        >{passwordRegError}</span>
      </label>
      <label className="form__label">
      <span className="form__label-text">Имя</span>
        <input
          name="regName"
          id="regName-input"
          className="form__input form__input_type_name"
          type=""
          placeholder="Введите имя"
          minLength="2"
          maxLength="200"
          value={regName}
          onChange={handleNameChange}
          required
        />
        <span
          id="regName-input-error"
          className="form__input-error"
        >{nameRegError}</span>
      </label>
      <button
        className={`form__submit-button ${ isDisabled ? 'form__submit-button_disabled': ''}`}
        type="submit"
        disabled={isDisabled}
      >
        Зарегистрироваться
      </button>
      <p className="form__text">
        или{" "}
        <button
          onClick={props.onRedirect}
          type="button"
          className="form__redirect-button"
        >
          Войти
        </button>
      </p>
    </PopupWithForm>
  );
}

export default RegisterPopup;
