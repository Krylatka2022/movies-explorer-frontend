import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/initialMovies';

function MoviesCardList() {

  return (
    <section className="movies">
      {movies.map((movie, i) => (
        <MoviesCard key={i} movie={movie} />
      ))}
      <button className="movies__button" type="button">Ещё</button>
    </section>
  );
};

export default MoviesCardList;
