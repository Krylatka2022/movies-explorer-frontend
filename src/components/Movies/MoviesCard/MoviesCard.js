import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard({ movie }) {
  const [select, setSelect] = useState(false);

  function handleSelect() {
    setSelect(!select);
  }

  return (
    <article className='movie'>
      <div className='movie__element'>
        <div className='movie__title-duration'>
          <h3 className='movie__title'>{movie.name}</h3>
          <p className='movie__duration'>{movie.duration}</p>
        </div>
        <button className={`movie__save-button ${select ? 'movie__save-button_active' : ''}`} type='button' onClick={handleSelect}></button>
      </div>
      <a className="movie__image-content" href='#' target="_blank" rel="noreferrer">
        <img className='movie__image' src={movie.image} alt={movie.name} onClick={handleSelect} /></a>

    </article>
  );
}

export default MoviesCard;
