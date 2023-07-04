import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {

  const backPage = useNavigate();

  function handleClickBack() {
    backPage(-1);
  };

  return (
    <section className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <p className='error-page__description'>Страница не найдена</p>
      <button className='error-page__link' onClick={handleClickBack} type='button'>Назад</button>
    </section>
  );
};

export default PageNotFound;
