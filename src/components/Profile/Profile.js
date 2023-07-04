import './Profile.css';
import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing(!isEditing);
  }
  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, Дарья!</h1>
        <form className="profile__form">
          <ul className="profile__form-container">
            <li className="profile__form-item">
              <p className="profile__field-label">Имя</p>
              <input className={`profile__field ${isEditing ? "profile__field_editing" : "profile__field_not-editing"}`}
                placeholder="name"
                id='name'
                name='name'
                required
                minLength="2"
                maxLength="40"
                disabled={!isEditing}
              />
            </li>

            <li className="profile__form-item">
              <p className="profile__field-label">E-mail</p>
              <input className={`profile__field ${isEditing ? "profile__field_editing" : "profile__field_not-editing"}`}
                placeholder="email"
                type='email'
                id='email'
                name='email'
                required
                minLength="2"
                maxLength="40"
                disabled={!isEditing}
              />
            </li>
          </ul>
          <div className="profile__form-buttons">
            <button className={`profile__button ${isEditing ? "profile__button_save" : "profile__button_edit"}`} type="button" onClick={handleClick}>
              {isEditing ? "Сохранить" : "Редактировать"}
            </button>
            <button className="profile__button profile__button_logout" type="button">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section >
    </>
  );
};

export default Profile;
