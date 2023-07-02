import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='title portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li>
          <a
            className='portfolio__link'
            target='_blank'
            href='https://krylatka2022.github.io/How-to-learn/'
            rel="noreferrer"
          >
            <p className='portfolio__link-title'>Статичный сайт</p>
          </a>
          <hr className='portfolio__line'></hr>
        </li>
        <li>
          <a
            className='portfolio__link'
            target='_blank'
            href='https://krylatka2022.github.io/Russian-travel/'
            rel="noreferrer"
          >
            <p className='portfolio__link-title'>Адаптивный сайт</p>
          </a>
          <hr className='portfolio__line'></hr>
        </li>
        <li>
          <a
            className='portfolio__link'
            target='_blank'
            // href='https://krylatka.nomoredomains.rocks'
            href='https://krylatka2022.github.io/react-mesto-auth/'
            rel="noreferrer"
          >
            <p className='portfolio__link-title'>Одностраничное приложение</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
