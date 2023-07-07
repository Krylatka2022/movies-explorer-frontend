import React, { useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import movies from '../../utils/initialMovies';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState(movies.filter((item) => item.saved));
  const isPreloader = false;
  const showMoreVisible = false;

  const handleDelete = (movie) => {
    const updatedMovies = savedMovies.filter((item) => item.id !== movie.id);
    setSavedMovies(updatedMovies);
  };

  return (
    <>
      <SearchForm />
      {isPreloader ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            movies={savedMovies}
            showMoreVisible={showMoreVisible}
            onDelete={handleDelete}
          />
        </>
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
