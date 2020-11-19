import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

function App() {
  return (
    <Router>
      <div>
      <header>
        <p>NewsExplorer</p>
        <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/saved-news">Сохраненные статьи</Link>
          </li>
          <li><button>Грета</button></li>
        </ul>
        </nav>
      </header>
       
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/saved-news">
           <SavedNews/>
          </Route>
        </Switch>
        <footer>
          <p>
          © 2020 Supersite, Powered by News API
          </p>
          <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/saved-news">Яндекс Практикум</Link>
          </li>
          <li>
            <Link to="#">Github</Link>
          </li>
        </ul>
        </nav>
        </footer>
      </div>
    </Router>
  );
}

export default App;
