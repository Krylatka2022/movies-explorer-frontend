import {
  shortsMovies
} from "./config";

export const Search = (cards, keyWord, isShort) => {
  const filtered = cards.filter(movie => movie.nameRU.toLowerCase().includes(keyWord));
  if (isShort) {
    return filtered.filter(movie => movie.duration < shortsMovies);
  } else {
    return filtered;
  }
};

// export const searchMovie = () => {
//   const movieDataBase = JSON.parse(localStorage.getItem('movieDataBase'));
//   const searchText = localStorage.getItem('searchText').toLowerCase();
//   const shortMovieSwitch = localStorage.getItem('shortMovieSwitch');

//   const foundMovies = movieDataBase.filter((movie) => movie.nameRU.toLowerCase().indexOf(searchText) >= 0);
//   if (shortMovieSwitch === 'true') return foundMovies.filter((movie) => movie.duration < shortsMovies);
//   else return foundMovies;
// };

// export const searchSavedMovie = (movie) => {
//   const shortMovieSwitch = localStorage.getItem('shortSavedMovieSwitch');
//   const savedMovieSearchText = localStorage.getItem('savedMovieSearchText').toLowerCase();

//   const foundMovies = movie.filter((movie) => movie.nameRU.toLowerCase().indexOf(savedMovieSearchText) >= 0);
//   if (shortMovieSwitch === true || shortMovieSwitch === 'true') {
//     return foundMovies.filter((movie) => movie.duration < shortsMovies);
//   } else return foundMovies;
// };
