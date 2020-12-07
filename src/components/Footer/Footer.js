import { Link } from "react-router-dom";
import "./Footer.css";
import githubLogoPath from "../../images/github-logo.svg";
import facebookLogoPath from "../../images/facebook-logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <ul className="footer__links">
        <li>
          <Link className="footer__link" to="/">Главная</Link>
        </li>
        <li>
          <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
        </li>
      </ul>
      <ul className="footer__social-links">
        <li className="footer__social-link">
          <a href="https://github.com/" target="_blank" rel="noreferrer"><img alt="github logo" src={githubLogoPath} /></a>
        </li>
        <li className="footer__social-link">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img alt="facebook logo" src={facebookLogoPath} /></a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
