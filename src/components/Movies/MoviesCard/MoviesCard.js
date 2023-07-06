import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, onDelete }) {
  const [select, setSelect] = useState(false);
  const location = useLocation();
  const isSavedMovies = location.pathname === '/saved-movies';

  function handleSelect() {
    setSelect(!select);
  }

  function handleDelete() {
    onDelete(movie);
  }

  return (
    <article className='movie'>
      <div className='movie__element'>
        <div className='movie__title-duration'>
          <h2 className='movie__title'>{movie.name}</h2>
          <p className='movie__duration'>{movie.duration}</p>
        </div>

        {isSavedMovies ? (
          <button className={`movie__save-button movie__save-button_delete`} type="button" onClick={handleDelete}>

          </button>
        ) : (
          <button
            className={`movie__save-button ${select ? 'movie__save-button_active' : ''}`}
            type="button"
            onClick={handleSelect}
          >
            {movie.saved ? '' : ''}
          </button>
        )}
      </div>
      <a className="movie__image-content" href="#" target="_blank" rel="noreferrer">
        <img className='movie__image' src={movie.image} alt={movie.name} onClick={handleSelect} />
      </a>
    </article>
  );
}

export default MoviesCard;
