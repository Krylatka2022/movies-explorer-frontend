import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header'
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { Search } from '../../utils/searchMovie';
import PopupTooltip from "../PopupTooltip/PopupTooltip";
import {
  widthMiddle,
  widthGrande,
  additColsSmall,
  additColsMiddle,
  additColsGrande,
  moviesSmall,
  moviesMiddle,
  moviesGrande,
} from "../../utils/config";

function Movies(isLoggedIn) {
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('searchResult')) ? JSON.parse(localStorage.getItem('searchResult')) : []);
  const [allMovies, setAllMovies] = useState([]);
  const [isSwitched, setIsSwitched] = useState(JSON.parse(localStorage.getItem('isSwitched')));
  const [searchKey, setSearchKey] = useState(localStorage.getItem('searchKey') ? localStorage.getItem('searchKey') : '');
  const [loading, setLoading] = useState(false);
  const [isPopupTooltipOpen, setIsPopupTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isAddit, setIsAddit] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);

  const updateWidth = () => {
    if (window.innerWidth < widthMiddle) {
      setIsAddit(additColsSmall);
      setTotalMovies(moviesSmall)
    }
    if (window.innerWidth > widthMiddle && window.innerWidth < widthGrande) {
      setIsAddit(additColsMiddle);
      setTotalMovies(moviesMiddle)
    }
    if (window.innerWidth > widthGrande) {
      setIsAddit(additColsGrande);
      setTotalMovies(moviesGrande)
    }
  };

  useEffect(() => {
    updateWidth();
  }, []);

  useEffect(() => {
    handleClick(searchKey);
  }, [isSwitched]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const handleCardLike = (card) => {
    // setLoading(true);
    moviesApi.handleLike(card)
      .then((res) => {
        card._id = res._id;
        if (!res) {
          throw new Error("Error");
        }
        return moviesApi.getSavedMovies();
      })
      .then((saved) => {
        JSON.stringify(saved);
        setSavedMovies(saved);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        if (error.status == 401) mainApi.signOut();
      });
  }


  function handleMore() {
    setTotalMovies((totalMovies) => totalMovies + isAddit);
  }

  const handleClick = (searchWord) => {
    updateWidth();
    setLoading(true);

    let moviesPromise = Promise.resolve(allMovies);
    if (allMovies.length == 0) {
      moviesPromise = moviesApi.getInitialMovies();
    }

    moviesPromise
      .then((movies) => {
        if (!movies) {
          throw new Error("Error");
        }
        JSON.stringify(movies);
        setAllMovies(movies);
        return Search(movies, searchWord.toLowerCase(), isSwitched);
      })
      .then((searchResult) => {
        setMovies(searchResult);
        if (searchResult.length == 0) {
          setIsPopupTooltipOpen(true);
          setTooltipMessage("Ничего не найдено");
        }
        return moviesApi.getSavedMovies();
      })
      .then((saved) => {
        setSavedMovies(saved);
        localStorage.setItem('searchKey', searchWord.toLowerCase());
        setSearchKey(searchWord.toLowerCase());
        localStorage.setItem('isSwitched', JSON.stringify(isSwitched));
        localStorage.setItem('searchResult', JSON.stringify(movies));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const closeTooltip = () => {
    setIsPopupTooltipOpen(!isPopupTooltipOpen);
  }

  function handleSwitcher() {
    setIsSwitched(!isSwitched);
  }

  const handleCardDelete = (_id) => {
    moviesApi.removeFromSavedMovies(_id)
      .then((res) => {
        if (!res) {
          throw new Error("Error");
        }
        return moviesApi.getSavedMovies();
      })
      .then((saved) => {
        JSON.stringify(saved);
        setSavedMovies(saved);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <SearchForm
          clickHandler={(e) => handleClick(e.target.searchInput.value)}
          switcherHandler={handleSwitcher}
          isSwitched={isSwitched}
          label={"Фильм"}
          search={searchKey}
        />
        {(movies.length != 0) &&
          <MoviesCardList
            movies={movies.slice(0, totalMovies)}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            savedMovies={savedMovies}
            mode='all'
          />

        }
        {(movies.length > totalMovies)
          &&
          <div className='movies__button' onClick={handleMore}>
            <button className="movies__button_active" type="button" onClick={handleMore}>Ещё</button>
          </div>}
      </main>
      <footer>
        <Footer />
      </footer>
      {isPopupTooltipOpen && <PopupTooltip
        isOpen={isPopupTooltipOpen}
        tooltipMessage={tooltipMessage}
        onClick={closeTooltip}
      />}
    </>
  );
};
export default Movies;
