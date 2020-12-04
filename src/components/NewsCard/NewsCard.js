import { useState } from "react";
import "./NewsCard.css";

function NewsCard(props) {
    const [isSaved, setiSSaved] = useState(false);
    const cardSaveButtonClass = (
        `news-card__button news-card__save-button ${isSaved ? 'news-card__save-button_active' : ''}`
    );

    const cardDeleteButtonClass = (
        `news-card__button news-card__delete-button`
    );

    const tooltipClassName = (
        `news-card__tooltip ${props.currentPage === 'saved-news' ? 'news-card__tooltip_big' : ''}`
    );

    const handleSaveClick = () => {
       return props.loggedIn === true && setiSSaved(!isSaved);
    };

    return (
            <li className="news-card">
            {props.currentPage === 'main' ? <button onClick={handleSaveClick} className={cardSaveButtonClass}></button> : ''}
            {props.currentPage !== 'main' ? <button className={cardDeleteButtonClass}></button> : ''}
            { (!props.loggedIn || props.currentPage === 'saved-news') && <div className={tooltipClassName}>{props.tooltip}</div> }
            { props.keyword && props.currentPage === 'saved-news' ? <div className="news-card__keyword">{props.keyword}</div> : '' }
            <a className="news-card__link" target="_blank" rel="noreferrer"  href={props.link}>
            <img className="news-card__image" alt={props.title} src={props.image} />
            <div className="news-card__text-container">
            <span className="news-card__date">{props.date}</span>
            <h3 className="news-card__title">{props.title}</h3>
            <p className="news-card__text">{props.text}</p>
            <span className="news-card__source">{props.source}</span>
            </div>
            </a>
            </li>
    );
  }
  
  export default NewsCard;