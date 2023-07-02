import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

import movies from '../../utils/initialMovies';

function Movies() {

  const isPreloader = false;

  return (
    <>
      <SearchForm />
      {isPreloader ? <Preloader /> :
        <>
          <MoviesCardList movies={movies} />
        </>
      }
    </>
  );
};

export default Movies;
