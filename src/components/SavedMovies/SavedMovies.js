import React, { useEffect, useState } from "react";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import { Search } from '../../utils/searchMovie';
import PopupTooltip from "../PopupTooltip/PopupTooltip";

import "./SavedMovies.css";
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


function SavedMovies(isLoggedIn) {

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('searchResultSaved')) ? JSON.parse(localStorage.getItem('searchResultSaved')) : []);
  const [allMovies, setAllMovies] = useState([]);
  const [isSwitched, setIsSwitched] = useState(JSON.parse(localStorage.getItem('isSwitchedSaved')));
  const [searchKey, setSearchKey] = useState(localStorage.getItem('searchKeySaved') ? localStorage.getItem('searchKeySaved') : '');
  const [loading, setLoading] = useState(false);
  const [isPopupTooltipOpen, setIsPopupTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isAddit, setIsAddit] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);


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

  const [searchWord, setSearchWord] = useState("");

  const handleClick = (searchWord) => {
    updateWidth();
    // setLoading(true);
    moviesApi.getSavedMovies()
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
        localStorage.setItem('searchKeySaved', searchWord.toLowerCase());
        setSearchKey(searchWord.toLowerCase());
        setSearchWord(""); // Очистить значение формы поиска
        localStorage.setItem('isSwitchedSaved', JSON.stringify(isSwitched));
        localStorage.setItem('searchResultSaved', JSON.stringify(movies));
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
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
        handleClick(searchKey)

        if (!res) {
          throw new Error("Error");
        }
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
          value={searchWord} // Добавляем значение из состояния searchWord
          onChange={(e) => setSearchWord(e.target.value)} // Обновляем значение в состоянии searchWord
        />

        <MoviesCardList
          movies={movies}
          savedMovies={allMovies}
          onCardLike={handleCardDelete}
          mode='saved'
          onCardDelete={handleCardDelete}
        />

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

export default SavedMovies;
