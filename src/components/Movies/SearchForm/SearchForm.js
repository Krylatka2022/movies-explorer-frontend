
import React, { useState, useEffect, useRef } from "react";

import "./SearchForm.css";
import { Checkbox } from "../../Checkbox/Checkbox";

export const SearchForm = ({
  clickHandler,
  switcherHandler,
  isSwitched,
  label,
  search,
  setSearch
}) => {

  const [state, setState] = useState(search);

  const [isActive, setIsActive] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const timerRef = useRef(null);

  const [isInputValid, setIsInputValid] = useState(true);

  useEffect(() => {
    setState(search);
  }, [search])


  useEffect(() => {
    if (!state) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [state])

  useEffect(() => {
    if (!isInputFocused && timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [isInputFocused]);


  function onChange(e) {
    const value = e.target.value;
    setState(value);
    setSearch(value); // Обновляем состояние внешнего компонента

    if (!value.trim()) {
      setIsInputValid(false);
    }
    else {

      setIsInputValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isInputValid) {
      clickHandler(state);
    }
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   clickHandler(search);
  // }
  //

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={handleSubmit}
      // onSubmit={(e) => handleSubmit(e)}
      // onSubmit={(e) => clickHandler(e)}
      // onSubmit={(e) => clickHandler(search, e)}

      >
        <div className='search__icon'></div>
        <div className="search__contain">
          <input
            name="searchInput"
            // className="search__input"
            className={`search__input ${!isInputValid ? 'search__input_invalid' : ''}`}
            type="text"
            id="inputSearch"
            placeholder={label}
            value={state}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={e => onChange(e)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button
            type="submit"
            className={isActive ? "search__button" : "search__button search__button_disabled"}
            disabled={!isActive}
          >
          </button>
        </div>
        <Checkbox
          isSwitched={isSwitched}
          handleSwitcher={switcherHandler}
        />

      </form>
      <hr className='search__line'></hr>
      {!isInputValid && <p className="search__error-title">Нужно ввести ключевое слово</p>}
    </section>
  );
};
export default SearchForm;
