import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import Preloader from '../Preloader/Preloader';


function NewsCardList(props) {
  return (
    <section className="search-results">
      { props.isSearchSuccessfull ? <h2 className="search-results__header"> {props.title} </h2> : ''}
      { props.isSearchSuccessfull ? <ul className="news-card-list">
        {props.articles.slice(0, props.resultsSplitter).flat(1).map((element, index) => {
          return <NewsCard
          data={element}
          tooltip={props.tooltip}
          currentPage={props.currentPage}
          loggedIn={props.loggedIn}
          handleSaveArticle={props.handleSaveArticle}
          handleDeleteArticle={props.handleDeleteArticle}
          askToRegister={props.askToRegister}
          key={index}
        />
        })}
      </ul> : <Preloader isLoading={props.isResultsLoading}  isSuccess={props.isSearchSuccessfull} serverError={props.serverError}/>
      }
      { props.isSearchSuccessfull && props.articles.length > 1 && props.resultsSplitter !== props.articles.length ?  <button className="search-results__button" onClick={props.handleShowMore}>Показать еще</button> : ''}
    </section>
  );
}

export default NewsCardList;
