import { React } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import NavBar from '../Movies/NavBar/NavBar';

function Header({ isLoggedIn }) {
  return (
    <header className='header'>
      <Link to='/' className='header__logo' />
      {!isLoggedIn && <Navigation />}
      {isLoggedIn && <NavBar />}
    </header>
  );
};

export default Header;
