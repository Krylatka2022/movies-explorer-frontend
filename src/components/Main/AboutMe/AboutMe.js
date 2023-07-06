import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

import avatar from '../../../images/Avatar.jpg';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='title about-me__title'>Студентка</h2>
      <hr className='about-me__line' ></hr>
      <div className='about-me__contain'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Дарья</h3>
          <p className='about-me__status'>Фронтенд-разработчик, 45 лет</p>
          <p className='about-me__description'>
            Родилась в&nbsp;Ленинграде, живу в&nbsp;Санкт-Петербурге, закончила факультет экономики (СПбГУП) и&nbsp;юриспруденции (ГУАП).
            Люблю всё красивое и&nbsp;полезное, латиноамериканскую музыку и&nbsp;танцы. Год назад поступила в&nbsp;&laquo;Яндекс.Практикум&raquo; на&nbsp;курс &laquo;Веб-разработчик&raquo;. В&nbsp;настоящий момент ищу заказы и&nbsp;единомышленников.
          </p>
          <a
            className='about-me__link'
            target='_blank'
            href='https://github.com/Krylatka2022'
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className='avatar' alt='Моя фотография' src={avatar} />
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
