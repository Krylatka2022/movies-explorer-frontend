

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
          key={movie.id} //постоянно ошибка
          // key={Math.random(1000000)}
          mode={mode}
          savedMovies={savedMovies}
          onCardLike={(card) => { onCardLike(card); }}
          onCardDelete={(card) => { onCardDelete(card); }}
        // onCardLike={onCardLike}
        // handleCardDelete={onCardDelete}
        // liked={savedMovies.some((savedMovie) => savedMovie._id === movie._id)}
        />)
      })
      }
    </section>
  );
};

export default MoviesCardList;
