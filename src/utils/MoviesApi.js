class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialMovies() {
    return fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }


  getSavedMovies() {
    return fetch(`${baseUrl2}/movies`, {
      method: "GET",
      credentials: 'include',
      // headers: {
      //   // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
      //   "Accept": "application/json",
      //   "Content-Type": "application/json",
      // },
    })
      .then((res) => this._checkResponse(res));
  }


  handleLike = (movie) => {
    return fetch(`${baseUrl2}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: `${baseUrl}` + movie.image.formats.thumbnail.hash + movie.image.formats.thumbnail.ext,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
      .then((res) => this._checkResponse(res));
  }

  removeFromSavedMovies = (_id) => {
    return fetch(`${baseUrl2}/movies/${_id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this._checkResponse(res));
  }
}
const moviesApi = new MoviesApi({
  // baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const baseUrl = "https://api.nomoreparties.co/beatfilm-movies";
const baseUrl2 = "https://api.diploma-krylatka.nomoredomains.rocks";

export default moviesApi;
