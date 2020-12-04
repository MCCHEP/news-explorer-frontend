import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import Preloader from '../Preloader/Preloader';


function NewsCardList(props) {
  return (
    <section className="search-results">
      { props.title && props.articles ? <h2 className="search-results__header"> {props.title} </h2> : ''}
      { props.articles ? <ul className="news-card-list">
        {props.articles.map((element, index) => {
          return <NewsCard
          keyword={element.keyword}
          tooltip={props.tooltip}
          currentPage={props.currentPage}
          loggedIn={props.loggedIn}
          key={index}
          link={element.link}
          image={element.image}
          date={element.date}
          title={element.title}
          text={element.text}
          source={element.source}
        />
        })}
      </ul> : <Preloader />
      }
      { props.title && props.articles ?  <button className="search-results__button">Показать еще</button> : ''}
    </section>
  );
}

export default NewsCardList;
