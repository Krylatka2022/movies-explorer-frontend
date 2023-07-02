import { Link } from 'react-router-dom';
import { useRef } from 'react';
import '../Register/Register.css';
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
    <section className="register">
      <Link to="/" className="register__logo" alt="Логотип сайта"></Link>
      <h2 className="register__title">Рады видеть!</h2>
      <form className="register__inputs" ref={formRef} onSubmit={handleSubmit} isValid={isValid} onChange={handleChange}>
        <fieldset className="register__items register__items-login">
          <label className="register__item register__item-login">
            <p className="register__item-label">E-mail</p>
            <input
              className={'register__input register__input_login'}
              name="email"
              type="email"
              placeholder="Ваш E-mail"
              value={values.email || ''}
              onChange={handleChange}
              // defaultValue='pochta@yandex.ru'
              required
            />
            <span className={`register__error ${errors.email ? 'register__error_visible' : ''}`}>{errors.email}</span>
          </label>

          <label className="register__item register__item-login">
            <p className="register__item-label">Пароль</p>
            <input
              className={'register__input register__input_error register__input-login'}
              name="password"
              type="password"
              minLength="2"
              placeholder="Ваш пароль"
              value={values.password || ''}
              onChange={handleChange}
              required
            />
            <span className={`register__error ${errors.password ? 'register__error_visible' : ''}`}>{errors.password}Что-то пошло не так..</span>
          </label>
        </fieldset>
        <button className='register__button register__button-login' type="submit">Войти</button>
      </form>

      <p className="register__text">Ещё не зарегистрированы?
        <Link to="/signup" className='register__link'>Регистрация</Link></p>

    </section>
  );
};

export default Login;

