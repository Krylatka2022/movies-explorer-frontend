
import {
  shortsMovies
} from "./config";

export const Search = (cards, keyWord, isShort) => {
  const lowerCaseKeyWord = keyWord.toLowerCase();
  // const filtered = cards.filter(movie => movie.nameRU.toLowerCase().includes(keyWord));
  const filtered = cards.filter((movie) => movie.nameRU.toLowerCase().includes(lowerCaseKeyWord));
  if (isShort) {
    return filtered.filter(movie => movie.duration < shortsMovies);
  } else {
    return filtered;
  }
};
