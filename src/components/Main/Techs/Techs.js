import './Techs.css';

function Techs() {
  return (
    <section className='techs' id='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <hr className='techs__line'></hr>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__description'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className='techs__list'>
        <li><a href="https://doka.guide/html/" className="techs__list-item" target="_blank" rel="noreferrer">HTML</a></li>
        <li><a href="https://doka.guide/css/" className="techs__list-item" target="_blank" rel="noreferrer">CSS</a></li>
        <li><a href="https://doka.guide/js/" className="techs__list-item" target="_blank" rel="noreferrer">JS</a></li>
        <li><a href="https://ru.legacy.reactjs.org/" className="techs__list-item" target="_blank" rel="noreferrer">React</a></li>
        <li><a href="https://git-scm.com/doc" className="techs__list-item" target="_blank" rel="noreferrer">Git</a></li>
        <li><a href="https://expressjs.com/ru/" className="techs__list-item" target="_blank" rel="noreferrer">Express.js</a></li>
        <li><a href="https://www.mongodb.com/docs/" className="techs__list-item" target="_blank" rel="noreferrer">mongoDB</a></li>
      </ul>
    </section>
  );
};

export default Techs;
