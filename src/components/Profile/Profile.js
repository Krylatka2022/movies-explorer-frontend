
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/useFormValidation';
import Header from '../Header/Header';
import './Profile.css';


function Profile({ isLoggedIn, logOut, changeProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, setErrors, isValid, setValue, setIsValid } = useFormValidation();
  const [isEditing, setIsEditing] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);

  const errorClassName = (name) => `profile__error ${errors[name] ? 'profile__error_visible' : ''}`

  useEffect(() => {
    document.title = 'Информация о пользователе';
  }, []);


  useEffect(() => {
    setIsFormModified(
      (currentUser.name !== values.userName || currentUser.email !== values.userEmail) &&
      isValid
    );
  }, [values, currentUser, isValid]);


  function handleSubmit(e) {
    e.preventDefault();
    changeProfile({
      name: values['userName'],
      email: values['userEmail']
    });
    setIsEditing(false);
  }

  useEffect(() => {
    if (currentUser) {
      setValue("userName", currentUser.name);
      setValue("userEmail", currentUser.email);

    }
    if (currentUser.name && currentUser.email) {
      setIsValid(true);
    }
  }, [currentUser, setValue, setIsValid]);

  function handleClick(e) {
    e.preventDefault();
    if (isEditing && isValid) {
      handleSubmit(e);
    } else {
      setIsEditing(!isEditing);
      if (!isEditing) {
        setValue("userName", currentUser.name);
        setValue("userEmail", currentUser.email);
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(name, value);
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormModified(value !== currentUser[name]);
  }

  function handleLogout(e) {
    e.preventDefault();
    logOut();
  }

  return (
    <>
      <header>
        <Header isLoggedIn={isLoggedIn} />
      </header>
      <section className="profile">
        <main>
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit} noValidate>
            <ul className="profile__form-container">
              <li className="profile__form-item">
                <p className="profile__field-label">Имя</p>
                <input
                  className={`profile__field ${isEditing ? "profile__field_editing" : "profile__field_not-editing"}`}
                  placeholder="name"
                  method="get"
                  id='inputName'
                  name='userName'
                  required
                  minLength="2"
                  maxLength="40"
                  disabled={!isEditing}
                  onChange={(e) => { handleChange(e) }}
                  // defaultValue={currentUser.name}
                  value={values['userName'] ?? ''}
                // value={values.userName || ''}
                />
              </li>
              <span className={errorClassName('userName')} id="inputName-error">{errors['userName']}</span>

              <li className="profile__form-item">
                <p className="profile__field-label">E-mail</p>
                <input className={`profile__field ${isEditing ? "profile__field_editing" : "profile__field_not-editing"}`}
                  placeholder="email"
                  type='email'
                  id='inputEmail'
                  name='userEmail'
                  required
                  minLength="2"
                  maxLength="40"
                  disabled={!isEditing}
                  onChange={(e) => { handleChange(e) }}                  // defaultValue={currentUser.email}
                  value={values['userEmail'] ?? ''}
                // value={values.userEmail || ''}
                />
              </li>
              <span className={errorClassName('userEmail')} id="inputEmail-error">{errors['userEmail']}</span>
            </ul>
            <div className="profile__form-buttons">
              {!isEditing ? (
                <button
                  className="profile__button profile__button_edit"
                  type="button"
                  onClick={handleClick}
                >
                  Редактировать
                </button>
              ) : (
                <button
                  className={`profile__button ${isFormModified && isValid ? "profile__button_save" : "profile__button_not-editing"}`}
                  type="submit"
                  disabled={!isFormModified || !isValid}
                >
                  Сохранить
                </button>
              )}
              <button className="profile__button profile__button_logout"
                onClick={handleLogout}
                type="submit"
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </main>
      </section >
    </>
  )
}

export default Profile;
