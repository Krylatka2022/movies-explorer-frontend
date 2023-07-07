import './Promo.css';
import NavTab from '../NavTab/NavTab';


function Promo() {
  return (
    <section className="promo">
      <div className="promo__contain">
        <h1 className="promo__title">Учебный проект студента факультета Веб‑разработки.</h1>
        <NavTab />
      </div>
    </section>
  );
};

export default Promo;
