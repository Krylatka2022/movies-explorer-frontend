

import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export const MoviesCardList = ({
  movies,
  savedMovies,
  mode,
  onCardDelete,
  onCardLike
}) => {

  return (
    <section className="movies">
      {movies.map((movie) => {
        return (<MoviesCard
          movie={movie}
          key={movie._id}
          // key={movie.id || movie.movieId} //постоянно ошибка
          // key={Math.random(1000000)}
          mode={mode}
          savedMovies={savedMovies}
          onCardLike={(movie) => { onCardLike(movie); }}
          onCardDelete={(movie) => { onCardDelete(movie); }}
        // onCardLike={onCardLike}
        // handleCardDelete={onCardDelete}
        // liked={savedMovies.some((savedMovie) => savedMovie.id === movie.id)}
        // onCardDelete={onCardDelete}
        />)
      })
      }
    </section>
  );
};

export default MoviesCardList;
