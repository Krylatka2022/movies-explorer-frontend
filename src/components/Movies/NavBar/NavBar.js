import './NavBar.css';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const location = useLocation();
  const handleClosePopup = () => setIsOpenPopup(!isOpenPopup);

  return (
    <nav className="navbar">
      <button className="navbar__hamburger" type="button" onClick={handleClosePopup}></button>
      <div className={`navbar__popup ${isOpenPopup ? 'navbar__popup_visible' : ''}`}>
        <div className="navbar__overlay">
          <div className="navbar__links-contain">
            <button className="navbar__close" type="button" onClick={handleClosePopup}></button>
            <ul className="navbar__links">
              <li className="navbar__link-element navbar__link-element-main">
                <NavLink to="/"
                  className={`navbar__link ${location.pathname === '/' ? 'navbar__link-element-main_active ' : ''}`}>Главная</NavLink>
              </li>
              <li className="navbar__link-element">
                <NavLink to="/movies"
                  className={`navbar__link ${location.pathname === '/movies' ? 'navbar__link_active' : ''}`}
                >Фильмы</NavLink>
              </li>
              <li className="navbar__link-element">
                <NavLink to="/saved-movies"
                  className={`navbar__link ${location.pathname === '/saved-movies' ? 'navbar__link_active' : ''}`}
                >Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/profile"
            className={`navbar__link navbar__account ${location.pathname === '/profile' ? 'active' : ''}`}
          >Аккаунт</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
