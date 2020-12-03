import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import { mainArticles } from "../../utils/data";
import About from '../About/About';
import Header from '../Header/Header';
import './Main.css';

function Main(props) {
    return (
      <>
      <Header currentPage="main" loggedIn={props.loggedIn} handleLogout={props.handleLogout} handleLogin={props.handleLogin}>
        <SearchForm/>
      </Header>
      <main>
        <NewsCardList articles={mainArticles} title="Результаты поиска" loggedIn={props.loggedIn} currentPage="main" tooltip="Войдите, чтобы сохранять статьи"/>  
        <About/>
      </main>
      </>
    );
  }
  
  export default Main;
  