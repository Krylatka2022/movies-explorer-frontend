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
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => this._checkResponse(res));
  }


  handleLike = (card) => {
    return fetch(`${baseUrl2}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        // "Origin": "https://diploma-krylatka.nomoredomains.rocks",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: 'https://api.nomoreparties.co' + card.image.url,
        trailerLink: card.trailerLink,
        thumbnail: `${baseUrl}` + card.image.formats.thumbnail.hash + card.image.formats.thumbnail.ext,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
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
