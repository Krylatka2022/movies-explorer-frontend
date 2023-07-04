import './NavBar.css';
import React, { useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const refPopup = useRef();
  const location = useLocation();

  function handleShowPopup(event) {
    const isLink = event.target.classList.contains('navbar__link');

    if (isOpenPopup && isLink) {
      return;
    }
    setIsOpenPopup(!isOpenPopup);
  }

  function handleClosePopup() {
    setIsOpenPopup(false);
  }


  return (
    <>
      <nav className={`navbar ${isOpenPopup ? 'navbar_show' : ''}`}>
        <ul className='navbar__links'>
          <li>
            <NavLink
              to='/'
              className={`navbar__link show ${location.pathname === '/' ? 'navbar__link_active' : ''}`}
              onClick={(event) => {
                handleShowPopup(event);
                handleClosePopup();
              }}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/movies'
              className={`navbar__link ${location.pathname === '/movies' ? 'navbar__link_active' : ''}`}
              onClick={(event) => {
                handleShowPopup(event);
                handleClosePopup();
              }}
            >
              Фильмы
            </NavLink>
          </li >
          <li >
            <NavLink
              to='/saved-movies'
              className={`navbar__link ${location.pathname === '/saved-movies' ? 'navbar__link_active' : ''}`}
              onClick={(event) => {
                handleShowPopup(event);
                handleClosePopup();
              }}
            >
              Сохранённые фильмы
            </NavLink>
          </li >
        </ul >
        <NavLink
          to='/profile'
          className={`navbar__account ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={(event) => {
            handleShowPopup(event);
            handleClosePopup();
          }}
        >
          Аккаунт
        </NavLink >
      </nav >
      <div className={`navbar__contain ${isOpenPopup ? 'show' : 'hide'}`}></div>
      <button
        ref={refPopup}
        className={`navbar__popup ${isOpenPopup ? 'navbar__popup_close' : 'navbar__popup_hamburger'}`}
        type='button'
        onClick={handleShowPopup}
      ></button>
    </>
  );
}

export default NavBar;
