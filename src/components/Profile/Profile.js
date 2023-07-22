
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/useFormValidation';
import Header from '../Header/Header';
import './Profile.css';


function Profile({ isLoggedIn, logOut, changeProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, setErrors, isValid, setValue, setIsValid, reset } = useFormValidation();
  const [isEditing, setIsEditing] = useState(false);


  const errorClassName = (name) => `profile__error ${errors[name] ? 'profile__error_visible' : ''}`

  useEffect(() => {
    document.title = 'Информация о пользователе';
  }, []);

  useEffect(() => {
    reset({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);


  useEffect(() => {
    if (values.email === currentUser.email && values.name === currentUser.name) {
      reset(values, {}, false);
    }
  }, [values.email, values.name]);


  useEffect(() => {
    if (!isLoggedIn) {
      reset();
    }
  }, [isLoggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    changeProfile({
      name: values['userName'],
      email: values['userEmail']
    });
    setIsValid(false)
    setIsEditing(!isEditing)
  }

  const [isFormModified, setIsFormModified] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    if (currentUser) {
      setValue("userName", currentUser.name);
      setValue("userEmail", currentUser.email);
      setInitialValues({
        userName: currentUser.name,
        userEmail: currentUser.email,
      });
      setIsFormModified(false); // Add this line to reset form modification status
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
    // setIsFormModified(values.userName !== initialValues.userName || values.userEmail !== initialValues.userEmail);
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
                  onChange={handleChange}
                  // defaultValue={currentUser.email}
                  value={values['userEmail'] ?? ''}
                // value={values.userEmail || ''}
                />
              </li>
              <span className={errorClassName('userEmail')} id="inputEmail-error">{errors['userEmail']}</span>
            </ul>
            <div className="profile__form-buttons">
              {isEditing ? (
                <button
                  className={`profile__button ${isEditing ? (isFormModified && isValid ? "profile__button_save" : "profile__button_edit") : "profile__button_not-editing"}`}
                  type="submit"
                  onClick={handleClick}
                  disabled={!isEditing || (isEditing && !isFormModified) || (isEditing && !isValid)}                >
                  {isEditing ? (isFormModified && isValid ? "Сохранить" : "Заполните поля") : "Редактировать"}
                </button>
              ) : (
                <button className="profile__button profile__button_edit" type="button"
                  onClick={handleClick}
                >
                  Редактировать
                </button>
              )}
              <button className="profile__button profile__button_logout"
                onClick={handleLogout}
                type="submit"
              // На Localhost при сабмите страницы user возвращается
              // to=''
              // onClick={() => handleLogoutClick('/')}
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
