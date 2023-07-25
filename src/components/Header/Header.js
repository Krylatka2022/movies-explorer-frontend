import { React } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import NavBar from '../Movies/NavBar/NavBar';

function Header({ isLoggedIn }) {
  return (
    <section className='header'>
      <Link to='/' className='header__logo' />
      {!isLoggedIn && <Navigation />}
      {isLoggedIn && <NavBar />}
    </section>
  );
};

export default Header;
