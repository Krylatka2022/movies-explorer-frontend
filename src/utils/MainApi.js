
class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse = res =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);

  register =
    //  ({ email, password, name })
    (items) => {

      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        credentials: 'include',
        headers: {
          // "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify
          // ({ email, password, name })
          ({
            email: items.email,
            password: items.password,
            name: items.name
          })

      })
        .then(res => this._checkResponse(res))
    };

  authorize = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        // "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then(res => this._checkResponse(res))
  }

  // signOut(email) {
  //   return fetch(`${this._baseUrl}/signout`, {
  //     method: "POST",
  //     credentials: 'include',
  //     headers: {
  //       // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       email
  //     }),
  //   })
  //     .then(res => this._checkResponse(res))
  // }

  signOut = () => {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(res => this._checkResponse(res))
  }



  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        "Content-Type": "application/json",
      },
    })
      .then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then(this._checkResponse).then((res) => res);
  }

  updateUserInfo(items) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: items.name,
        email: items.email
      }),
    }).then(res => this._checkResponse(res));
  }

}

const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.diploma-krylatka.nomoredomains.rocks',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;
