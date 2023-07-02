import './Profile.css';
import React, { useState } from 'react';

function Profile() {
  const [isDisable, setIsDisable] = useState(true);

  function handleClick() {
    setIsDisable(!isDisable);
  }
  return (
    <>
      <section className="profile">
        <h2 className="profile__title">Привет, Дарья!</h2>
        <form className="profile__form">
          <ul className="profile__form-container">
            <li className="profile__form-item">
              <p className="profile__field-label">Имя</p>
              <input className="profile__field"
                placeholder="name"
                id='name'
                name='name'
                required
                minLength="2"
                maxLength="40"
                disabled={isDisable}
              />
            </li>

            <li className="profile__form-item">
              <p className="profile__field-label">E-mail</p>
              <input className="profile__field"
                placeholder="email"
                type='email'
                id='email'
                name='email'
                required
                minLength="2"
                maxLength="40"
                disabled={isDisable}
              />
            </li>
          </ul>
          <div className="profile__form-buttons">
            <button className="profile__button" type="button" onClick={handleClick}>
              Редактировать
            </button>
            <button className="profile__button profile__button_logout" type="button">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
