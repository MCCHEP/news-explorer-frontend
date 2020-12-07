import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import Header from '../Header/Header';
import { savedArticles } from "../../utils/data";

function SavedNews(props) {
  return (
    <>
    <Header currentPage="saved-news" loggedIn={props.loggedIn} handleLogout={props.handleLogout}>
      <SavedNewsHeader />
    </Header>
    <main> 
      <NewsCardList currentPage="saved-news" articles={savedArticles} tooltip="Убрать из сохранённых"/>
    </main>
    </>
  );
}

export default SavedNews;
