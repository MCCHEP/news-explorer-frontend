import { BASE_URL, defaultType } from "./constants";
class MainApi {
  constructor(data) {
    this._baseUrl = data.url;
    this._headers = data.headers;
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._prepareData);
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._prepareData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          this._setToken(data.token);
          return data;
        }
      });
  }

  getMyInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._prepareData);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: this._headers,
    }).then(this._prepareData);
  }

  saveArticle(data) {
    const { keyword, title, text, date, source, link, image, } = data;
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        keyword, title, text, date, source, link, image,
      }),
    }).then(this._prepareData);
  }

  deleteArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`,
      {
        method: 'DELETE',
        headers: this._headers
      }).then(this._prepareData);
  }

  _prepareData(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

export const explorerApi = new MainApi({
  url: BASE_URL,
  headers: {
    "Content-Type": defaultType,
  },
});
