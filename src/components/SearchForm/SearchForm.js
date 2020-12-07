import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="header__form-container">
      <h1 className="header__form-title">Что творится в мире?</h1>
      <p className="header__form-subtitle">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>
      <form className="search-form">
        <input
          className="search-form__input"
          name="searchInpur"
          id="search-input"
          type="text"
          placeholder="Введите текст"
          minLength="2"
          maxLength="200"
        />
        <button className="search-form__button">Искать</button>
      </form>
    </div>
  );
}

export default SearchForm;
