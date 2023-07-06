import './Navigation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../Movies/NavBar/NavBar';

function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleButtonClick = (path) => {
    // Обработчик нажатия кнопки
    // Перейти на указанный маршрут
    navigate(path);
  };

  return (
    <nav className='navigation'>
      {isLoggedIn ? (
        <NavBar />
      ) : (
        <ul className="navigation__list">
          <li className="navigation__item">
            <button
              onClick={() => handleButtonClick('/signup')}
              className={`navigation__link ${pathname === '/' ? 'navigation__link_register' : ''}`}
              type="button"
            >
              Регистрация
            </button>
          </li>
          <li className="navigation__item">
            <button
              onClick={() => handleButtonClick('/signin')}
              className="navigation__link navigation__link_signin"
              type="button"
            >
              Войти
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
