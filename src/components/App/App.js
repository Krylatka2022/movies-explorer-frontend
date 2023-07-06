import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound'
import api from '../../utils/api';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Footer from '../Footer/Footer';
// import { createBrowserHistory } from 'history';
import Preloader from '../Movies/Preloader/Preloader';

// const history = createBrowserHistory();

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmail, setIsEmail] = useState(null);
  const [isName, setIsName] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = React.useState(true);
  const { pathname } = useLocation();




  const handleRegister = ({ email, password, name }) => {
    return api.register(email, password, name)
      // отправляем запрос на сервер для регистрации пользователя
      .then((res) => {
        return res;
      })
      .then(() => {
        handleLogin({ email, password })
      })
      .then(() => {
        navigate('/signin', { replace: true })
      })
      .catch(err => {
        if (err) {
          console.log(`Ошибка: ${err}`);
        }
      });
  };


  // Вход в аккаунт
  const handleLogin = ({ email, password }) => {
    return api.authorize(email, password).then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('firstSearch', true);
        setIsLoggedIn(true);
      }
    })
      .then(() => {
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        <dialog open>
          <p>Уверены?</p>
          <div>
            <button>Yes</button>
            <button onclick="document.querySelector('dialog').close()">Cancel</button>
          </div>
        </dialog>

        // alert('Что-то пошло не так')
      });
  };

  // Проверка токена и авторизация пользователя
  useEffect(() => {
    // const jwt = localStorage.getItem('jwt');
    if (localStorage.getItem('_id')) {
      // отправляем запрос на сервер для проверки токена
      // api.checkToken(jwt)
      api.checkToken
        .then((res) => {
          // если токен действителен, обновляем стейт isLoggedIn и currentUser
          if (res) {
            setIsLoggedIn(true);
            // setIsEmail(res.data.email);
            // setIsName(res.data.name);
            // navigate("/");
          }
        })
        .catch((err) => console.log(err));
      handleLogout();
    }
  },
    [navigate]);
  // []);

  // Получение данных текущего пользователя
  useEffect(() => {
    if (isLoggedIn)
      Promise.all([api.getUserInfo()]).then(([data]) => {
        setCurrentUser(data);
      }).catch((err) => {
        console.error(err);
      });
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
  };


  // Для проверки верстки
  const LoggedInNavbar = () => {
    setIsLoggedIn(true);
  };
  const LoggedInNavigation = () => {
    setIsLoggedIn(false);
  }

  const isHeaderVisible = pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';

  return (
    <div className="app">
      <button type="button" onClick={LoggedInNavbar}>CLICK_NavBar</button>
      <button type="button" onClick={LoggedInNavigation}>CLICK_Navigation</button>

      {isHeaderVisible && <Header isLoggedIn={isLoggedIn} isLoading={isLoading} />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<main><Movies /></main>} />
        <Route path="/saved-movies" element={<main><SavedMovies /></main>} />
        <Route path="/profile" element={<main><Profile /></main>} />
        <Route path="/signin" element={isLoggedIn ? <Navigate to="/" /> : <main><Login onLogin={handleLogin} /></main>} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <main><Register onRegister={handleRegister} /></main>} />
        <Route path="*" element={<main><PageNotFound /></main>} />
      </Routes>
    </div>
  );
}

export default App;
