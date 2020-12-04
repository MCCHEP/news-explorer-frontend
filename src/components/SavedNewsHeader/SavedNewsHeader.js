import "./SavedNewsHeader.css";

function SavedNewsHeader() {
    return (
           <div className="saved-news-header">
            <p className="saved-news-header__title">Сохранённые статьи</p>
            <h1 className="saved-news-header__main-info">Грета, у вас 5 сохранённых статей</h1>
            <p className="saved-news-header__keywords">По ключевым словам: <span className="saved-news-header__keyword">Природа</span>, <span className="saved-news-header__keyword">Тайга</span> и <span className="saved-news-header__keyword">2-м другим</span></p>  
          </div>
    );
  }
  
  export default SavedNewsHeader;