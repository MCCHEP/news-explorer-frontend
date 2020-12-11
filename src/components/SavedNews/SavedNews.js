import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Header from '../Header/Header';

function SavedNews(props) {
  return (
    <>
    <Header currentPage="saved-news" loggedIn={props.loggedIn} handleLogout={props.handleLogout}>
      <SavedNewsHeader numberOfSaved={props.savedNews.flat().length}>
        {props.keywords.length === 1 ? <p className="saved-news-header__keywords">По ключевому слову: <span className="saved-news-header__keyword">{props.keywords[0]}</span></p> : ''}
        {props.keywords.length === 2 ? <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">{props.keywords[0]}</span> и <span className="saved-news-header__keyword">{props.keywords[1]}</span></p> : ''}
        {props.keywords.length === 3 ? <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">{props.keywords[0]}</span>, <span className="saved-news-header__keyword">{props.keywords[1]}</span> и <span className="saved-news-header__keyword">{props.keywords[2]}</span></p> : ''}
        {props.keywords.length > 3 && ((props.keywords.length - 2) % 10 !== 1) ? <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">{props.keywords[0]}</span>, <span className="saved-news-header__keyword">{props.keywords[1]}</span> и <span className="saved-news-header__keyword">{props.keywords.length - 2} другим</span></p> : ''}
        {(props.keywords.length - 2) && props.keywords.length > 4 ? <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">{props.keywords[0]}</span>, <span className="saved-news-header__keyword">{props.keywords[1]}</span> и <span className="saved-news-header__keyword">{props.keywords.length - 2} другому</span></p> : ''}
      </SavedNewsHeader>
    </Header>
    <main> 
      <NewsCardList 
      currentPage="saved-news" 
      articles={props.savedNews} 
      tooltip="Убрать из сохранённых"
      isResultsLoading={false}
      isSearchSuccessfull={true}
      serverError={false}
      loggedIn={props.loggedIn}
      resultsSplitter={props.resultsSplitter}
      handleShowMore={props.handleShowMore}
      handleDeleteArticle={props.handleDeleteArticle}
      />
    </main>
    </>
  );
}

export default SavedNews;
