import './NavBar.css';
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const refPopup = useRef();

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
        <div className='navbar__links'>
          <NavLink
            exact
            to='/'
            className='navbar__link show'
            onClick={(event) => {
              handleShowPopup(event);
              handleClosePopup();
            }}
          >
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            className='navbar__link'
            onClick={(event) => {
              handleShowPopup(event);
              handleClosePopup();
            }}
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='navbar__link'
            onClick={(event) => {
              handleShowPopup(event);
              handleClosePopup();
            }}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink to='/profile' className='navbar__account' onClick={(event) => {
          handleShowPopup(event);
          handleClosePopup();
        }}>
          Аккаунт
        </NavLink>
      </nav>
      <div className={`navbar__contain ${isOpenPopup ? 'show' : 'hide'}`}></div>
      <div
        ref={refPopup}
        className={`navbar__popup ${isOpenPopup ? 'navbar__popup_close' : 'navbar__popup_hamburger'}`}
        onClick={handleShowPopup}
      ></div>
    </>
  );
}

export default NavBar;
