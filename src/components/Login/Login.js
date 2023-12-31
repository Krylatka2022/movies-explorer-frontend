import '../Register/Auth.css';
import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../utils/useFormValidation';


const Login = ({ onLogin, isLoading, isLoggedIn }) => {
  const { values, errors, reset, handleChange } = useFormValidation();
  const errorClassName = (name) => `auth__error ${errors[name] ? 'auth__error_visible' : ''}`
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => reset({}, {}, false), []);

  const handleFormValid = useCallback((event) => {
    setIsFormValid(event.target.closest('form').checkValidity());
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values)
  }
  return (
    <section className="auth">
      <Link to="/" className="auth__logo" alt="Логотип сайта"></Link>
      <h2 className="auth__title">Рады видеть!</h2>

      <form className="auth__inputs" onSubmit={handleSubmit}
        onChange={handleFormValid} isloading={isLoading.toString()}>
        <div className="auth__items">
          <label className="auth__item">
            <p className="auth__item-label">E-mail</p>
            <input
              className='auth__input'
              name="email"
              type="email"
              id='inputEmail'
              placeholder="Ваш E-mail"
              value={values.email || ''}
              required
              onChange={handleChange}
              pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
            />
            <span className={errorClassName('email')} id="inputEmail-error">{errors['email']}</span>
          </label>

          <label className="auth__item">
            <p className="auth__item-label">Пароль</p>
            <input
              className='auth__input'
              name="password"
              type="password"
              id='inputPassword'
              minLength="2"
              placeholder="Ваш пароль"
              value={values.password || ''}
              onChange={handleChange}
              required
            />
            <span className={errorClassName('password')} id="inputPassword-error">{errors['password']}</span>
          </label>
        </div>
        <button
          className={`auth__button ${isFormValid ? '' : 'auth__button_disabled'} `}
          type="submit" disabled={!isFormValid}>Войти</button>
      </form>
      <p className="auth__text">Ещё не зарегистрированы?
        <Link to="/signup" className="auth__link">Регистрация</Link>
      </p>
    </section>
  );
};

export default Login;
