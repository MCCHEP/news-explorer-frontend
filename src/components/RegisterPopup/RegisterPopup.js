import React from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function RegisterPopup(props) {
  const {values, errors, isValid, handleChange,  resetForm} = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    props.onSubmit(values.regEmail, values.regPassword, values.regName);
   
  };

  React.useEffect(() => {
    resetForm();
  },[props.isOpen, resetForm])


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
          value={values.regEmail || ""}
          onChange={handleChange}
          required
        />
        <span id="regEmail-input-error" className="form__input-error">{errors.regEmail || ""}</span>
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
          value={values.regPassword || ""}
          onChange={handleChange}
          required
        />
        <span
          id="regPassword-input-error"
          className="form__input-error"
        >{errors.regPassword || ""}</span>
      </label>
      <label className="form__label">
      <span className="form__label-text">Имя</span>
        <input
          name="regName"
          id="regName-input"
          className="form__input form__input_type_name"
          type="text"
          placeholder="Введите имя"
          minLength="2"
          maxLength="200"
          value={values.regName || ""}
          onChange={handleChange}
          required
        />
        <span
          id="regName-input-error"
          className="form__input-error"
        >{errors.regName || ""}</span>
      </label>
      <span id="server-error" className="form__server-error">{props.serverError}</span>
      <button
        className={`form__submit-button ${ !isValid ? 'form__submit-button_disabled': ''}`}
        type="submit"
        disabled={!isValid}
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
