import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__icon'></div>
        <div className='search__contain'>
          <input className='search__input' type='text' placeholder='Фильм' required />
          <button className='search__button' type='submit'></button>
        </div>
        <label className="search__checkbox">
          <input className="search__input-checkbox" type="checkbox" />
          <div className="search__checkbox-switch"></div>
          <span className="search__checkbox-label">Короткометражки</span>
        </label>

      </form>
      <hr className='search__line'></hr>
    </section>
  );
};


export default SearchForm;
