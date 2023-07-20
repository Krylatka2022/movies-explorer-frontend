import React from 'react';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main({ isLoggedIn }) {
  return (
    <>
      <header>
        <Header isLoggedIn={!isLoggedIn} />
      </header>
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Main;
