import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>
        О проекте</h2>
      <hr className='about-project__line'></hr>
      <ul className='about-project__description'>
        <li className='about-project__description-contain'>
          <h3 className='about-project__description-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__description-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__description-contain'>
          <h3 className='about-project__description-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about-project__timeline'>
        <li className='about-project__timeline-contain'>
          <p className='about-project__timeline-duration about-project__timeline-duration_little'>1 неделя</p>
          <p className='about-project__timeline-title'>Back-end</p>
        </li>
        <li className='about-project__timeline-contain'>
          <p className='about-project__timeline-duration about-project__timeline-duration_big'>4 недели</p>
          <p className='about-project__timeline-title'>Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;
