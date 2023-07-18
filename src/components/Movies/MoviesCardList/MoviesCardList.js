// import './MoviesCardList.css';
// import MoviesCard from '../MoviesCard/MoviesCard';
// import movies from '../../../utils/initialMovies';

// function MoviesCardList({ showMoreVisible, onDelete }) {
//   const handleDelete = (movie) => {
//     onDelete(movie);
//   };

//   return (
//     <section className="movies">
//       {movies.map((movie, i) => (
//         <MoviesCard key={i} movie={movie} onDelete={handleDelete} />
//       ))}
//       {showMoreVisible ? (
//         <button className="movies__button" type="button">Ещё</button>
//       ) : (
//         <button className="movies__button-placeholder"></button>
//       )}    </section>
//   );
// };

// export default MoviesCardList;

import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export const MoviesCardList = ({
  movies,
  savedMovies,
  onCardLike,
  mode,
  onCardDelete
}) => {

  return (
    <section className="movies">
      {movies.map((movie) => (
        <MoviesCard
          key={Math.random(1000000)}
          movie={movie}
          mode={mode}
          savedMovies={savedMovies}
          onCardLike={(card) => { onCardLike(card); }}
          onCardDelete={(card) => { onCardDelete(card); }}
        />
      ))}
    </section>
  );
};

export default MoviesCardList;
