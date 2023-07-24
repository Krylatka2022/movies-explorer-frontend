
import React, { useState, useEffect, useCallback } from "react";
import likeImg from "../../../images/save9.svg";
import deleteImg from "../../../images/delete-movie.svg";
import disLikeImg from "../../../images/save9d.svg";
import "./MoviesCard.css";

export const MoviesCard = ({
  movie,
  savedMovies,
  onCardLike,
  mode,
  onCardDelete }) => {

  const [isLiked, setisLiked] = useState(false);
  const [id, setId] = useState('');

  function handleDuration(minutes) {
    let mins = minutes % 60;
    let hours = Math.floor(minutes / 60);
    if (hours > 0) { return hours + ' h. ' + mins + ' min.'; }
    else { return minutes + ' min.'; }
  }

  useEffect(() => {
    checkLike();
  }, [movie, savedMovies]);

  // const checkLike = () => {


  //   let likedMovie = savedMovies.find(
  //     (savedMovie) => savedMovie._id === movie._id
  //   );
  //   setisLiked(!!likedMovie);
  // };

  const checkLike = useCallback(async () => {
    let likedMovie = savedMovies.filter((savedMovie) => (savedMovie.nameRU == movie.nameRU) || (savedMovie.nameEN == movie.nameEN))
    if (likedMovie.length != 0) {
      setisLiked(true);
      setId(likedMovie[0]._id);
    }
  }, []);

  const handleCardLike = () => {
    if (isLiked) {
      try {
        onCardDelete(movie._id);
        setisLiked(false);
      } catch (error) {


        console.error("Error deleting the movie:", error);
      }
    } else {
      try {
        onCardLike(movie);
        setisLiked(true);
      } catch (error) {


        console.error("Error liking the movie:", error);
      }
    }
  };

  // const handleCardLike = () => {
  //   if (isLiked) {
  //     onCardDelete(id);
  //   }
  //   else {
  //     onCardLike(movie);
  //   }
  //   setisLiked(!isLiked);
  // };
  return (
    <section>
      <article className="movie" >
        <div className="movie__element">
          <div className="'movie__title-duration">
            <h2 className="movie__title">{movie.nameEN}</h2>
            <p className="movie__duration">{handleDuration(movie.duration)}</p>
          </div>
          <button
            className="movie__save-button"
            type="button"
            // onClick={(e) => { handleCardLike(e); }}
            onClick={handleCardLike}

          >
            {isLiked ?
              <img src={mode == "all" ? likeImg : deleteImg} />
              :
              <img src={mode == "all" ? disLikeImg : deleteImg} />
            }
          </button>
        </div>
        <a href={movie.trailerLink} className="movie__image-content" target="_blank" rel="noreferrer">
          <img
            src={mode == "all" ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
            className="movie__image"
            alt={`foto ${movie.nameEN}`}
          />
        </a>
      </article>
    </section>
  );
};

export default MoviesCard;
