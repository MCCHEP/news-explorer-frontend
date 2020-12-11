import "./Preloader.css";
import notFoundLogoPath from "../../images/not-found.svg";

function Preloader(props) {

  return (
    <div className="preloader">
      {props.isLoading === false && props.isSuccess === false ? (
        <>
          <img className="preloader__not-found-icon" src={notFoundLogoPath} alt=""></img>
          <span className="preloader__not-found-title">{ props.serverError ? 'Во время запроса произошла ошибка.' : 'Ничего не найдено'}</span>
          <span className="preloader__text">
          { props.serverError ? 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'К сожалению по вашему запросу ничего не найдено.'}
            
          </span>
        </>
      ) : (
        <>
          <i className="preloader__indicator"></i>
          <span className="preloader__text">Идет поиск новостей...</span>
        </>
      )}
    </div>
  );
}

export default Preloader;
