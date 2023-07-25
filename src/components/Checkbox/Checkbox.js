import React from "react";
import "./Checkbox.css";

export const Checkbox = ({ isSwitched, handleSwitcher }) => {

  function handleSwitch(e) {
    e.preventDefault();
    handleSwitcher();
  }

  return (
    <label
      className="checkbox"
    >

      <button
        type="submit"
        className="checkbox__button"
        onClick={handleSwitch}
      >
        <div
          className={
            (isSwitched == true)
              ? "checkbox__switch_active checkbox__button_active"
              : "checkbox__switch"
          }
        ></div>
      </button>
      <h2
        className="checkbox-label"
      >Короткометражки</h2>
    </label>
  );
};
