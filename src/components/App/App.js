import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PopupTooltip from "../PopupTooltip/PopupTooltip";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from '../Movies/Preloader/Preloader';
import { ProtectedRoutes } from '../ProtectedRoute/ProtectedRoutes';
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import "./App.css";
export const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPopupTooltipOpen, setIsPopupTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  // Получение данных текущего пользователя
  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then((data) => setCurrentUser(data))
        .catch(error => console.log(error));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);


  const checkToken = () => {
    mainApi
      .checkToken()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };


  const onLogin = (data) => {
    mainApi
      .authorize(data)
      .then((res) => {
        if (res._id) {
          localStorage.setItem('_id', res._id);
          setIsLoggedIn(true);
          setIsPopupTooltipOpen(true);
          setTooltipMessage(`Вы успешно вошли в систему!`);
        };
      })
      .catch(err => {
        if (err) {
          setIsPopupTooltipOpen(true);
          setTooltipMessage("Неправильный e-mail или пароль");
        }
      })
  };

  const onRegister = (data) => {
    mainApi
      .register(data)
      .then(res => {
        if (res._id) {
          onLogin(data);
          setIsPopupTooltipOpen(true);
          setTooltipMessage(`Регистрация прошла успешно!`);
        }
      })
      .catch(err => {
        if (err) {
          setIsPopupTooltipOpen(true);
          setTooltipMessage("Пользователь с таким email уже зарегистрирован");
        }
        else {
          setTooltipMessage(`Ошибка регистрации: ${err}`);
        }
      });
  };

  const onUpdateUser = (items) => {
    mainApi.updateUserInfo(items)
      .then((data) => {
        setCurrentUser(data);
        setIsPopupTooltipOpen(true);
        setTooltipMessage("Профиль успешно обновлён!")

      })
      .catch((err) => {
        if (err) {
          setIsPopupTooltipOpen(true);
          setTooltipMessage("Ошибка! Данный e-mail уже используется")
        }
      });
  };


  const signOut = () => {
    mainApi.signOut()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false);
        setCurrentUser({});
        setIsPopupTooltipOpen(true);
        setTooltipMessage("Вы успешно вышли из системы!");

      })
      .catch(() => {
        setIsPopupTooltipOpen(true);
        setTooltipMessage("На сервере произошла ошибка!")
      });
  }


  const closeTooltip = () => {
    setIsPopupTooltipOpen(!isPopupTooltipOpen);
  }

  if (loading) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <div className="app">

          <Routes>
            <Route path="/" element={
              // {
              //   Localhost isLoggedIn={isLoggedIn}
              // }
              <Main isLoggedIn={!isLoggedIn} />
            } />

            <Route path="/movies" element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <Movies />
              </ProtectedRoutes>
            } />

            <Route path="/saved-movies" element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <SavedMovies />
              </ProtectedRoutes>
            } />

            <Route path="/profile" element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <Profile
                  logOut={signOut}
                  changeProfile={onUpdateUser}
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoutes>
            } />

            <Route path="/signin" element={
              <Login
                isLoggedIn={isLoggedIn}
                onLogin={onLogin}
                isLoading={isLoading}
              />}
            />

            <Route path="/signup" element={
              <Register
                isLoggedIn={isLoggedIn}
                onRegister={onRegister}
                isLoading={isLoading}
              />} />

            <Route path="*" element={<PageNotFound />} />

          </Routes>

          {isPopupTooltipOpen && <PopupTooltip
            isOpen={isPopupTooltipOpen}
            tooltipMessage={tooltipMessage}
            onClick={closeTooltip}
          />}

        </div>
      </Router>

    </CurrentUserContext.Provider>
  );
};

export default App;
