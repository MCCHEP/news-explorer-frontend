import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Header from "../Header/Header";
import "./Main.css";

function Main(props) {
  return (
    <>
      <Header
        currentPage="main"
        loggedIn={props.loggedIn}
        handleLogout={props.handleLogout}
        handleLogin={props.handleLogin}
      >
        <SearchForm onSubmit={props.onSubmit} />
      </Header>
      <main>

        { !props.isResultsHidden ? <NewsCardList
          isResultsLoading={props.isResultsLoading}
          isSearchSuccessfull={props.isSearchSuccessfull}
          serverError={props.serverError}
          articles={props.newsList}
          title="Результаты поиска"
          loggedIn={props.loggedIn}
          currentPage="main"
          tooltip="Войдите, чтобы сохранять статьи"
          resultsSplitter={props.resultsSplitter}
          handleShowMore={props.handleShowMore}
          handleSaveArticle={props.handleSaveArticle}
          handleDeleteArticle={props.handleDeleteArticle}
          askToRegister={props.askToRegister}
        /> : ''}
        <About />
      </main>
    </>
  );
}

export default Main;
