import { Link } from 'react-router-dom';
import { useRef } from 'react';
import '../Register/Auth.css';
import { useFormValidation } from '../../utils/useFormValidation';


function Login({ onLogin }) {
  const formRef = useRef(null);
  const { values, errors, isValid, handleChange } = useFormValidation({});

  const handleSubmit = event => {
    event.preventDefault();
    onLogin({
      email: values.email,
      password: values.password
    });
  };

  return (
    <section className="auth">
      <Link to="/" className="auth__logo" alt="Логотип сайта"></Link>
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__inputs" ref={formRef} onSubmit={handleSubmit} isValid={isValid} onChange={handleChange}>
        <fieldset className="auth__items auth__items-login">
          <label className="auth__item auth__item-login">
            <p className="auth__item-label">E-mail</p>
            <input
              className={'auth__input auth__input_login'}
              name="email"
              type="email"
              placeholder="Ваш E-mail"
              value={values.email || ''}
              onChange={handleChange}
              // defaultValue='pochta@yandex.ru'
              required
            />
            <span className={`auth__error ${errors.email ? 'auth__error_visible' : ''}`}>{errors.email}</span>
          </label>

          <label className="auth__item auth__item-login">
            <p className="auth__item-label">Пароль</p>
            <input
              className={'auth__input auth__input_error auth__input-login'}
              name="password"
              type="password"
              minLength="2"
              maxLength="30"
              placeholder="Ваш пароль"
              value={values.password || ''}
              onChange={handleChange}
              required
            />
            <span className={`auth__error ${errors.password ? 'auth__error_visible' : ''}`}>{errors.password}Что-то пошло не так..</span>
          </label>
        </fieldset>
        <button className='auth__button auth__button-login' type="submit">Войти</button>
      </form>

      <p className="auth__text">Ещё не зарегистрированы?
        <Link to="/signup" className='auth__link'>Регистрация</Link></p>

    </section>
  );
};

export default Login;

