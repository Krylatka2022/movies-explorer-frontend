import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <hr className='footer__line'></hr>
      <nav className='footer__nav'>
        <p className='footer__copyright'> © {new Date().getFullYear()}</p>
        <ul className='footer__links'>
          <li>
            <a
              className='footer__link'
              target='_blank'
              href='https://practicum.yandex.ru/'
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className='footer__link'
              target='_blank'
              href='https://github.com/Krylatka2022/'
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
