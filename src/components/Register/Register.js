import './Register.css';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useFormValidation } from '../../utils/useFormValidation';


function Register({ onRegister }) {
  // const formRef = useRef(null);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const { values, errors, isValid, handleChange, reset } = useFormValidation({});

  const handleSubmit = event => {
    event.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password
    });

    // const handleSubmit = event => {
    //   event.preventDefault();
    //   onRegister({
    //     name: name,
    //     email: email,
    //     password: password
    //   });

    // formRef.current.reset(); // Сброс формы после успешной отправки
    // Сброс значений полей после успешной отправки
    //   setName('');
    //   setEmail('');
    //   setPassword('');
    //   reset();

  };

  return (
    <section className="register">
      <Link to="/" className="register__logo" alt="Логотип сайта"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__inputs" onSubmit={handleSubmit} isValid={isValid} reset={reset}>
        <fieldset className="register__items">
          <label className="register__item">
            <p className="register__item-label">Имя</p>
            <input
              className="register__input"
              id='name'
              name="name"
              type="text"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              value={values.name || ''}
              // value={name}
              // defaultValue='Виталий'
              onChange={handleChange}
              // onChange={e => setName(e.target.value)}
              required
            />
            <span className={`register__error ${errors.name ? 'register__error_visible' : ''}`}>{errors.name}</span>
          </label>
          <label className="register__item">
            <p className="register__item-label">E-mail</p>
            <input
              className={'register__input'}
              id='email'
              name="email"
              type="email"
              placeholder="E-mail"
              value={values.email || ''}
              // value={email}
              // defaultValue='pochta@yandex.ru'
              onChange={handleChange}
              // onChange={e => setEmail(e.target.value)}
              required
            />
            <span className={`register__error ${errors.email ? 'register__error_visible' : ''}`}>{errors.email}</span>
          </label>
          <label className="register__item">
            <p className="register__item-label">Пароль</p>
            <input
              className={'register__input register__input_error'}
              name="password"
              type="password"
              minLength="2"
              placeholder="Пароль"
              value={values.password || ''}
              // value={password}
              // defaultValue='somepassword'
              onChange={handleChange}
              // onChange={e => setPassword(e.target.value)}
              required
            />
            <span className={`register__error ${errors.password ? 'register__error_visible' : ''}`}>{errors.password}Что-то пошло не так..</span>
          </label>
        </fieldset>
        <button className='register__button' type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы?
        <Link to="/signin" className='register__link'>Войти</Link></p>

    </section>
  );
};

export default Register;

