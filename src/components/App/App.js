import { Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { searchApi } from "../../utils/NewsApi";
import { splitIntoTriplets } from "../../utils/utils";
import { explorerApi } from "../../utils/MainApi";
import DateConverter from "../../utils/DateConverter";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import AuthPopup from "../AuthPopup/AuthPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchSuccessfull, setIsSearchSuccessfull] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [isErrorFromServer, setIsErrorFromServer] = useState(false);
  const [isResultsHidden, setIsResultsHidden] = useState(true);
  const [resultsSplitter, setResultsSplitter] = useState(1);
  const [savedArticlesSplitter, setSavedArticlesSplitter] = useState(1);
  const [serverError, setServerError] = useState("");

  const handleAuthLaunch = () => {
    closeAllPopups();
    setIsAuthPopupOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
  };

  const closeAllPopups = () => {
    setIsAuthPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setServerError("");
  };

  const handleAuthSubmit = (authEmail, authPassword) => {
    explorerApi
      .login(authEmail, authPassword)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log(`${err.status} - пользователь с email не найден`);
        } else if (err.status === 400) {
          console.log(`${err.status} - не передано одно из полей`);
        } else {
          console.log("Произошла неизвестная ошибка");
        }
      });
  };

  const handleSaveArticle = (data) => {
    return explorerApi
      .saveArticle(data)
      .then((res) => {
        if (res.data._id) {
          const newSavedArticles = savedArticles.length > 0 ? [...savedArticles] : [];
          if (newSavedArticles.length > 0 && newSavedArticles[newSavedArticles.length - 1].length < 3) {
            newSavedArticles[newSavedArticles.length - 1].push(res.data);
          } else {
            newSavedArticles.push([res.data]);
          }
          setSavedArticles(newSavedArticles);
          return res.data;
        }
      })
      .catch((err) => console.log(`Сохранение статьи на сервер: ${err}`));
  };

  const handleDeleteArticle = (article) => {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    explorerApi
      .deleteArticle(article._id)
      .then((res) => {
        if (res.data._id === article._id) {
          const newSavedArticles = savedArticles.map((element) =>
            element.filter((item) => item !== article)
          );
          setSavedArticles(newSavedArticles);
          return res.data;
        }
      })
      .catch((err) => console.log(`Удаление статьи с сервера: ${err}`));
  };

  const redirectToAuth = () => {
    closeAllPopups();
    setIsAuthPopupOpen(true);
  };

  const redirectToRegister = () => {
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  };

  const handleSearchSubmit = (keyword) => {
    setResultsSplitter(1);
    setIsSearchSuccessfull(false);
    setIsResultsLoading(true);
    searchApi
      .searchForResults(keyword)
      .then((data) => {
        setIsResultsLoading(false);
        if (data.articles.length !== 0) {
          const result = splitIntoTriplets(
            data.articles.map((element) => {
              return {
                keyword: keyword,
                title: element.title,
                text: element.description,
                date:  DateConverter.convertDateFromString(element.publishedAt),
                source: element.source.name,
                link: element.url,
                image: element.urlToImage,
              };
            })
          );
          setSearchResults(result);
          localStorage.setItem("searchResults", JSON.stringify(result));
          setIsSearchSuccessfull(true);
        } else {
          setSearchResults([]);
        }
      })
      .catch((err) => {
        setIsResultsLoading(false);
        setIsSearchSuccessfull(false);
        setIsErrorFromServer(true);
        console.log(`Ошибка поиска: ${err}`);
      });
  };

  const handleMore = () => {
    return resultsSplitter < searchResults.length
      ? setResultsSplitter(resultsSplitter + 1)
      : "";
  };

  const handleMoreSaved = () => {
    return savedArticlesSplitter < savedArticles.length
      ? setSavedArticlesSplitter(savedArticlesSplitter + 1)
      : "";
  };

  const onRegister = (regEmail, regPassword, regName) => {
    explorerApi
      .register(regEmail, regPassword, regName)
      .then((res) => {
        if (res.data._id && res.data.email && res.data.name) {
          setIsRegisterPopupOpen(false);
          setIsSuccessPopupOpen(true);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setServerError("Такой пользователь уже есть");
          console.log(`${err.status} - повторная регистрация`);
        } else if (err.status === 400) {
          console.log(`${err.status} - некорректно заполнено одно из полей`);
        } else {
          setServerError(
            "Произошла неизвестная ошибка. Подождите и попробуйте еще раз."
          );
        }
      });
  };

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    explorerApi._setToken(jwt);
    if (jwt) {
      explorerApi
        .getMyInfo()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push(location.pathname);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            err.json().then((err) => console.log(`401 - ${err.message}`));
          } else {
            console.log("Произошла неизвестная ошибка");
          }
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isResultsLoading === true) {
      setIsResultsHidden(false);
    }
  }, [isResultsLoading]);

  useEffect(() => {
    let results = JSON.parse(localStorage.getItem("searchResults"));
    if (results) {
      setSearchResults(results);
      setIsSearchSuccessfull(true);
      setIsResultsHidden(false);
      setIsErrorFromServer(false);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([explorerApi.getMyInfo(), explorerApi.getSavedArticles()])
        .then(([info, data]) => {
          setCurrentUser(info.data);
          setSavedArticles(splitIntoTriplets(data.data));
        })
        .catch((err) =>
          console.log(
            `Загрузка информации о пользователе или cохраненных новостях: ${err}`
          )
        );
    } else {
      setCurrentUser({});
      setSavedArticles([]);
      setKeywords({});
    }
  }, [loggedIn]);

  useEffect(() => {
    let keywordsObj = {}
    savedArticles.flat().forEach((element) => {
      if (keywordsObj.hasOwnProperty(element.keyword)) {
        return (keywordsObj[element.keyword] += 1);
      } else {
        return (keywordsObj[element.keyword] = 1);
      }
    });
    setKeywords(Object.entries(keywordsObj).sort((a,b)=>b[1]-a[1]).map(el=>el[0]));
  }, [savedArticles]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              loggedIn={loggedIn}
              newsList={searchResults}
              handleLogout={handleLogout}
              handleLogin={handleAuthLaunch}
              onSubmit={handleSearchSubmit}
              isSearchSuccessfull={isSearchSuccessfull}
              isResultsLoading={isResultsLoading}
              isResultsHidden={isResultsHidden}
              resultsSplitter={resultsSplitter}
              handleShowMore={handleMore}
              serverError={isErrorFromServer}
              handleSaveArticle={handleSaveArticle}
              handleDeleteArticle={handleDeleteArticle}
              askToRegister={redirectToRegister}
            />
          </Route>
          <ProtectedRoute
            path="/saved-news"
            exact
            handleShowMore={handleMoreSaved}
            resultsSplitter={savedArticlesSplitter}
            loggedIn={loggedIn}
            component={SavedNews}
            savedNews={savedArticles}
            keywords={keywords}
            handleLogout={handleLogout}
            handleDeleteArticle={handleDeleteArticle}
          />
          <Route>
            {loggedIn ? <Redirect to="/saved-news" /> : <Redirect to="/" />}
          </Route>
        </Switch>
        <Footer />
        <AuthPopup
          isOpen={isAuthPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAuthSubmit}
          onRedirect={redirectToRegister}
        />
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onRedirect={redirectToAuth}
          serverError={serverError}
          onSubmit={onRegister}
        />
        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          onClick={redirectToAuth}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
