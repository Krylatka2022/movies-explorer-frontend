import React, { useState, useEffect, useRef } from "react";
import "./SearchForm.css";
import { Checkbox } from "../../Checkbox/Checkbox";

export const SearchForm = ({
  clickHandler,
  switcherHandler,
  isSwitched,
  label,
  search,

}) => {

  const [state, setState] = useState(search);

  const [isActive, setIsActive] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const timerRef = useRef(null);


  // useEffect(() => {
  //   setState(search);
  // }, [search])


  function onChange(e) {
    setState(e.target.value);
  }

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

  function handleFocus() {
    setIsInputFocused(true);
  }

  function handleBlur() {
    setIsInputFocused(false);
    timerRef.current = setTimeout(() => {
      setState("");
    }, 2000); // Время, через которое поле input будет очищено (в миллисекундах).
  }

  // function handleBlur() {
  //   setIsInputFocused(false);

  //   if (!state) {
  //     setState("");
  //   }
  // }

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={clickHandler}

      >
        <div className='search__icon'></div>
        <div className="search__contain">
          <input
            name="searchInput"
            className="search__input"
            type="text"
            placeholder={label}
            value={state}
            onChange={e => onChange(e)}
            onFocus={handleFocus}
            onBlur={handleBlur}
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
    </section>
  );
};
export default SearchForm;
