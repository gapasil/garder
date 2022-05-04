import React from 'react';

import styles from './Advantages.module.scss';
import back from './assets/svg/back.svg';
import money from './assets/svg/money.svg';
import ship from './assets/svg/ship.svg';

const Advantages = () => (
  <div className={styles.advantages}>
    <div className="t_sub mb-45">
      <img className="mb-1" src={ship} alt="icon" />
      <p className="bold mb-1">Доставка</p>
      <p>Доставка по всему Казахстану</p>
    </div>
    <div className="t_sub mb-45">
      <img className="mb-1" src={money} alt="icon" />
      <p className="bold mb-1">Без предоплат</p>
      <p>Оплата удобным способом</p>
    </div>
    <div className="t_sub mb-45">
      <img className="mb-1" src={back} alt="icon" />
      <p className="bold mb-1">Возврат товара</p>
      <p>
        Вы всегда можете вернуть товар если он вам не подходит почтой, у вас
        есть 14 дней на возврат.
      </p>
    </div>
  </div>
);

export default Advantages;
