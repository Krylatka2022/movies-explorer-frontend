// const BASE_URL = 'http://localhost:3001';
const BASE_URL = 'https://api.diploma-krylatka.nomoredomains.rocks'
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  register = (email, password, name) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    }).then(res => this._checkResponse(res))
  };

  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      //записываются в приложение куки
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      sameSite: 'none',
    })
      .then(res => this._checkResponse(res))
    // .then((data) => {
    //   localStorage.setItem('userId', data._id)
    //   return data;
    // }
    // )
  };

  checkToken = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res))
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }

  changeUserInfo(items) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: items.name,
        email: items.email,
      }),
    }).then(res => this._checkResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
      },
    })
      .then(res => this._checkResponse(res));
  }

  addMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
      .then(res => this._checkResponse(res));
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
      }
    }).then(res => this._checkResponse(res));
  }
}
/** Подключить API */
const api = new Api
  ({
    baseUrl: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

export default api;
