import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useState } from "react";
import './App.css';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import AuthPopup from '../AuthPopup/AuthPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';


function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const handleAuthLaunch = () => {
    setIsAuthPopupOpen(true);
  }
  
  const handleLogout = () => {
    setLoggedIn(false);
    history.push('/');
  }

  const closeAllPopups = () => {
    setIsAuthPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(false);
  }

  const handleAuthSubmit = () => {
    setLoggedIn(true);
  };

  const handleRegSubmit = () => {
    setIsRegisterPopupOpen(false);
    setIsSuccessPopupOpen(true);
  };

  const redirectToAuth = () => {
    closeAllPopups();
    setIsAuthPopupOpen(true);
  }

  const redirectToRegister = () => {
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  }

  return (
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} handleLogout={handleLogout} handleLogin={handleAuthLaunch}/>
          </Route>
          <Route exact path="/saved-news">
           <SavedNews loggedIn={loggedIn} handleLogout={handleLogout}/>
          </Route>
        </Switch>
       <Footer/>
       <AuthPopup 
         isOpen={isAuthPopupOpen}
         onClose={closeAllPopups}
         onSubmit={handleAuthSubmit}
         onRedirect={redirectToRegister}
       />
        <RegisterPopup 
         isOpen={isRegisterPopupOpen}
         onClose={closeAllPopups}
         onSubmit={handleRegSubmit}
         onRedirect={redirectToAuth}
       />
       <SuccessPopup 
         isOpen={isSuccessPopupOpen}
         onClose={closeAllPopups}
         onClick={redirectToAuth}
       />
      </div>
  );
}

export default App;
