import React, { useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import movies from '../../utils/initialMovies';

function Movies() {
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  const isPreloader = false;

  return (
    <>
      <SearchForm />
      {isPreloader ? <Preloader /> :
        <>
          <MoviesCardList movies={movies} showMoreVisible={showMoreVisible}
            setShowMoreVisible={setShowMoreVisible} />
        </>
      }
      <Footer />

    </>
  );
};

export default Movies;
