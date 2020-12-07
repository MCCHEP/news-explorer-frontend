import "./Preloader.css";
import { useState } from "react";
import notFoundLogoPath from "../../images/not-found.svg";

function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className="preloader">
      {isLoaded && isSuccess === false ? (
        <>
          <img className="preloader__not-found-icon" src={notFoundLogoPath} alt=""></img>
          <span className="preloader__not-found-title">Ничего не найдено</span>
          <span className="preloader__text">
            К сожалению по вашему запросу ничего не найдено.
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
