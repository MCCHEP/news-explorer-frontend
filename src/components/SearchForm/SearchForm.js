import React from "react";
import "./SearchForm.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function SearchForm(props) {
  const {values, errors, isValid, handleChange } = useFormWithValidation();


  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(values.searchInput);
  
  };

  return (
    <div className="header__form-container">
      <h1 className="header__form-title">Что творится в мире?</h1>
      <p className="header__form-subtitle">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>
      <form className="search-form" onSubmit={handleSubmit}>
        <span id="search-input-error" className="search-form__error">{errors.searchInput || ""}</span>
        <input
          className="search-form__input"
          name="searchInput"
          id="search-input"
          type="text"
          placeholder="Введите текст"
          minLength="2"
          maxLength="200"
          value={values.searchInput || ""}
          onChange={handleChange}
          required
        />
        <button disabled={!isValid} className={`search-form__button ${ !isValid ? 'search-form__button_disabled': ''}`} type="submit">Искать</button>
      </form>
    </div>
  );
}

export default SearchForm;
