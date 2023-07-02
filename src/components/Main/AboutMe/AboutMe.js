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
          <p className='about-me__name'>Дарья</p>
          <p className='about-me__status'>Фронтенд-разработчик, 45 лет</p>
          <p className='about-me__description'>
            Родилась в Ленинграде, живу в Санкт-Петербурге, закончила факультет экономики (СПбГУП) и юриспруденции (ГУАП).
            Люблю всё красивое и полезное, латиноамериканскую музыку и танцы.
            Год назад поступила в "Яндекс.Практикум" на курс "Веб-разработчик".
            В настоящий момент активно ищу заказы и единомышленников.
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
