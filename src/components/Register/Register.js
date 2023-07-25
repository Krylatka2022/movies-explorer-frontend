import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useFormValidation } from '../../utils/useFormValidation';



function Register({ isLoggedIn, onRegister }) {

  const navigate = useNavigate();
  const { values, errors, reset, handleChange } = useFormValidation();
  const errorClassName = (name) => `auth__error ${errors[name] ? 'auth__error_visible' : ''}`

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormValid = useCallback((event) => {
    setIsFormValid(event.target.closest('form').checkValidity());
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies', { replace: true });
    }
  }, [isLoggedIn]);


  useEffect(() => reset({}, {}, false), []);

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(values)
  }


  return (
    <section className="auth">
      <Link to="/" className="auth__logo" alt="Логотип сайта"></Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__inputs" onSubmit={handleSubmit} onChange={handleFormValid}>
        <fieldset className="auth__items">
          <label className="auth__item">
            <p className="auth__item-label">Имя</p>
            <input
              className="auth__input"
              id='inputName'
              name="name"
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
              value={values.name || ''}
              onChange={handleChange}
              pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]+$"
            />
            <span className={errorClassName('name')} id="inputName-error">{errors['name']}</span>

          </label>
          <label className="auth__item">
            <p className="auth__item-label">E-mail</p>
            <input
              className={'auth__input'}
              id='inputEmail'
              name="email"
              type="email"
              placeholder="E-mail"
              value={values.email || ''}
              onChange={handleChange}
              required
              pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
            />
            <span className={errorClassName('email')} id="inputEmail-error">{errors['email']}</span>

          </label>
          <label className="auth__item">
            <p className="auth__item-label">Пароль</p>
            <input
              className={'auth__input auth__input_error'}
              name="password"
              id='inputPassword'
              type="password"
              minLength="2"
              maxLength="30"
              placeholder="Пароль"
              value={values.password || ''}
              onChange={handleChange}
              required
            />
            <span className={errorClassName('password')} id="inputPassword-error">{errors['password']}</span>

          </label>
        </fieldset>

        <button
          className={`auth__button ${isFormValid ? '' : 'auth__button_disabled'} `}
          type="submit" disabled={!isFormValid}>
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__text">Уже зарегистрированы?
        <Link to="/signin" className='auth__link'>Войти</Link></p>
    </section>
  );
};

export default Register;


