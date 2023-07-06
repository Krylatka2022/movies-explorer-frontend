import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/initialMovies';

function MoviesCardList({ showMoreVisible, onDelete }) {
  const handleDelete = (movie) => {
    onDelete(movie);
  };

  return (
    <section className="movies">
      {movies.map((movie, i) => (
        <MoviesCard key={i} movie={movie} onDelete={handleDelete} />
      ))}
      {showMoreVisible ? (
        <button className="movies__button" type="button">Ещё</button>
      ) : (
        <button className="movies__button-placeholder"></button>
      )}    </section>
  );
};

export default MoviesCardList;
