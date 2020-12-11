import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function AuthPopup(props) {
  const {values, errors, isValid, handleChange,  resetForm} = useFormWithValidation();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(values.authEmail, values.authPassword);
    props.onClose();
    
  };

  React.useEffect(() => {
    resetForm();
  },[props.isOpen, resetForm])

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
          value={values.authEmail || ""}
          onChange={handleChange}
          required
        />
        <span id="authEmail-input-error" className="form__input-error">
        {errors.authEmail || ""}
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
          value={values.authPassword || ""}
          onChange={handleChange}
          required
        />
        <span id="authPassword-input-error" className="form__input-error">
        {errors.authPassword || ""}
        </span>
      </label>
      <button
        className={`form__submit-button ${ !isValid ? 'form__submit-button_disabled': ''}`}
        type="submit"
        disabled={!isValid}
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
