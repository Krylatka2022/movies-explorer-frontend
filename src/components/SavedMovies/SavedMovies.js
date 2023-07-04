import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
