import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../Movies/NavBar/NavBar';

function Navigation({ isLoggedIn }) {
  const { pathname } = useLocation();
  return (
    <nav className='navigation'>
      {isLoggedIn ? <NavBar /> : (
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/signup" className={`navigation__link ${pathname === "/" && 'navigation__link_register'}`}>Регистрация</Link>
          </li>
          <li className="navigation__item">
            <Link to="/signin" className="navigation__link navigation__link_signin">Войти</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
