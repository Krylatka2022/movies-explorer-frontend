import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
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
      <Footer />

    </>
  );
};

export default Movies;
