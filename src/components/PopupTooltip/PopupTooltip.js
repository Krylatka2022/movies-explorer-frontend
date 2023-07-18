import { useState } from 'react';
import logoImage from "../../images/logo.svg";
import "./PopupTooltip.css";

export const PopupTooltip = ({ isOpen, tooltipMessage, onClick }) => {

  const [open, setOpen] = useState({ isOpen });

  function handleClick() {
    onClick();
  }

  return (
    <section
      className={`${open ? "tooltip__overlay tooltip_opened" : "tooltip__overlay"}`}
      onClick={handleClick}
    >
      <div className="tooltip">
        <img
          src={`${logoImage}`}
          alt="Логотип сайта"
          className="tooltip__logo"
        />
        <h2 className={"tooltip__title"}>
          {tooltipMessage}
        </h2>
        <button
          className='tooltip__button'
          onClick={handleClick}
        // active={true}
        >OK</button>

      </div>
    </section>
  );
}

export default PopupTooltip;
