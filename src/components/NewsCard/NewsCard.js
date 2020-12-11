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
        if(props.loggedIn && !isSaved) {
            props.handleSaveArticle(props.data).then((data) => {
                if(data) {
                    setiSSaved(true)
                }
            });
        } else if(props.loggedIn && isSaved) {
            props.handleDeleteArticle(props.data).then((data) => {
                if(data) {
                    setiSSaved(false)
                }
            });

        } else {
           props.askToRegister()
        } ;
    };

    const handleDeleteClick = () => {
        props.handleDeleteArticle(props.data);
    }

    return (
            <li className="news-card">
            {props.currentPage === 'main' ? <button onClick={handleSaveClick} className={cardSaveButtonClass}></button> : ''}
            {props.currentPage !== 'main' ? <button onClick={handleDeleteClick} className={cardDeleteButtonClass}></button> : ''}
            { (!props.loggedIn || props.currentPage === 'saved-news') && <div className={tooltipClassName}>{props.tooltip}</div> }
            { props.data.keyword && props.currentPage === 'saved-news' ? <div className="news-card__keyword">{props.data.keyword}</div> : '' }
            <a className="news-card__link" target="_blank" rel="noreferrer"  href={props.data.link}>
            <img className="news-card__image" alt={props.data.title} src={props.data.image} />
            <div className="news-card__text-container">
            <span className="news-card__date">{props.data.date}</span>
            <h3 className="news-card__title">{props.data.title}</h3>
            <p className="news-card__text">{props.data.text}</p>
            <span className="news-card__source">{props.data.source}</span>
            </div>
            </a>
            </li>
    );
  }
  
  export default NewsCard;