
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
  moviesSmall,
  moviesMiddle,
  moviesGrande,
} from "../../utils/config";


function SavedMovies(isLoggedIn) {

  // const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('searchResultSaved')) ? JSON.parse(localStorage.getItem('searchResultSaved')) : []);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isSwitched, setIsSwitched] = useState(JSON.parse(localStorage.getItem('isSwitchedSaved')));
  const [searchKey, setSearchKey] = useState(localStorage.getItem('searchKeySaved') ? localStorage.getItem('searchKeySaved') : '');
  const [loading, setLoading] = useState(false);
  const [isPopupTooltipOpen, setIsPopupTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (savedMovies) {
      setMovies(savedMovies);
      setAllMovies(savedMovies);
    }
  }, []);

  const updateWidth = () => {
    if (window.innerWidth < widthMiddle) {
      setTotalMovies(moviesSmall)
    }
    if (window.innerWidth >= widthMiddle && window.innerWidth < widthGrande) {
      setTotalMovies(moviesMiddle)
    }
    if (window.innerWidth >= widthGrande) {
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

  const saveSearchResults = (movies) => {
    localStorage.setItem('searchResultSaved', JSON.stringify(movies));
    setMovies(movies);
  }

  const handleClick = (searchWord) => {
    updateWidth();
    setLoading(true);
    setSearchWord(""); // Очистить значение формы поиска

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
        // setMovies(searchResult);
        saveSearchResults(searchResult);
        if (searchResult.length == 0) {
          setIsPopupTooltipOpen(true);
          setTooltipMessage("Ничего не найдено");
        }
        localStorage.setItem('searchKeySaved', searchWord.toLowerCase());
        setSearchKey(searchWord);
        localStorage.setItem('isSwitchedSaved', JSON.stringify(isSwitched));
        localStorage.setItem('searchResultSaved', JSON.stringify(movies));

      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      })
      .finally(() => {
        // setSearchKey("");
        setLoading(false);
      });
  }

  const closeTooltip = () => {
    setIsPopupTooltipOpen(!isPopupTooltipOpen);
  }

  function handleSwitcher() {
    setIsSwitched(!isSwitched);
  }

  // const handleCardDelete = (_id) => {
  //   moviesApi.removeFromSavedMovies(_id)
  //     .then((res) => {
  //       handleClick(searchKey)

  //       if (!res) {
  //         throw new Error("Error");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(`Ошибка: ${error}`);
  //     });
  // }
  const [savedMovies, setSavedMovies] = useState([]);
  // const handleCardDelete = (_id) => {
  //   moviesApi.removeFromSavedMovies(_id)
  //     .then(() => {


  //       // Fetch the updated list of saved movies after the deletion
  //       return moviesApi.getSavedMovies();
  //     })
  //     .then((saved) => {
  //       JSON.stringify(saved);


  //       setSavedMovies(saved); // Update the savedMovies state with the updated list
  //     })
  //     .catch((error) => {


  //       console.log(`Ошибка: ${error}`);
  //     });
  // };


  // const handleCardDelete = (id) => {
  //   moviesApi.removeFromSavedMovies(id)
  //     .then(() => {
  //       // Remove the movie from the savedMovies state
  //       setSavedMovies(savedMovies.filter((movie) => movie.id !== id));
  //     })
  //     .catch((error) => {
  //       console.log(`Ошибка: ${error}`);
  //     });
  // };

  const handleCardDelete = (_id) => {
    moviesApi.removeFromSavedMovies(_id)
      .then((res) => {
        handleClick(searchKey)

        if (!res) {
          throw new Error("Error");
        }
        setSavedMovies(savedMovies.filter((movie) => movie._id !== _id));

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
          // clickHandler={(e) => handleClick(e.target.searchInput.value)}
          clickHandler={(e) => handleClick(searchKey, e)}
          switcherHandler={handleSwitcher}
          isSwitched={isSwitched}
          label={"Фильм"}
          search={searchKey}
          setSearch={setSearchKey}
          value={searchWord} // Добавляем значение из состояния searchWord
          onChange={(e) => setSearchWord(e.target.value)} // Обновляем значение в состоянии searchWord
        />

        <MoviesCardList
          movies={movies}
          savedMovies={allMovies}
          onCardLike={handleCardDelete}

          // mode='saved'
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
