import React from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AuthPopup(props) {
  const [authEmail, setAuthEmail] = React.useState("");
  const [authPassword, setAuthPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleEmailChange = (e) => {
    setAuthEmail(e.target.value);
    checkInputValidity();
  };
  const handlePasswordChange = (e) => {
    setAuthPassword(e.target.value);
    checkInputValidity();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClose();
    props.onSubmit();
    setEmailError("");
    setPasswordError("");
    setEmailError("");
    setPasswordError("");
  };

  const checkInputValidity = () => {
    const emailInp = document.getElementById("authEmail-input");
    const passwordInp = document.getElementById("authPassword-input");
    if (!emailInp.checkValidity() && emailInp.value !== "") {
      setEmailError(emailInp.validationMessage);
      setIsDisabled(true);
    } else {
      setEmailError("");
    }
    if (!passwordInp.checkValidity() && passwordInp.value !== "") {
      setPasswordError(passwordInp.validationMessage);
      setIsDisabled(true);
    } else {
      setPasswordError("");
    }
    if (emailInp.checkValidity() && passwordInp.checkValidity()) {
      setIsDisabled(false);
    }
  };

  return (
    <PopupWithForm
      name="auth"
      title="Вход"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <span className="form__label-text">Email</span>
        <input
          name="authEmail"
          id="authEmail-input"
          className="form__input form__input_type_email"
          type="email"
          placeholder="Введите почту"
          minLength="2"
          maxLength="40"
          value={authEmail}
          onChange={handleEmailChange}
          required
        />
        <span id="authEmail-input-error" className="form__input-error">
          {emailError}
        </span>
      </label>
      <label className="form__label">
      <span className="form__label-text">Пароль</span>
        <input
          name="authPassword"
          id="authPassword-input"
          className="form__input form__input_type_password"
          type="password"
          placeholder="Введите пароль"
          minLength="2"
          maxLength="200"
          value={authPassword}
          onChange={handlePasswordChange}
          required
        />
        <span id="authPassword-input-error" className="form__input-error">
          {passwordError}
        </span>
      </label>
      <button
        className={`form__submit-button ${ isDisabled ? 'form__submit-button_disabled': ''}`}
        type="submit"
        disabled={isDisabled}
      >
        Войти
      </button>
      <p className="form__text">
        или{" "}
        <button
          onClick={props.onRedirect}
          type="button"
          className="form__redirect-button"
        >
          Зарегистрироваться
        </button>
      </p>
    </PopupWithForm>
  );
}

export default AuthPopup;
