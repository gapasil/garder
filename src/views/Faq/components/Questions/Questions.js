import React, { useState } from 'react';

import { Animation, Line } from '../../../../components';
import { Classes } from '../../../../utils';

import close from './assets/svg/close.svg';
import styles from './Questions.module.scss';

const Questions = ({ list = [] }) => {
  return (
    <div className={styles.questions}>
      <h1>
        Часто задаваемые вопросы
        <Line />
      </h1>

      {list.map((item, idx) => (
        <Question item={item} key={idx} />
      ))}
    </div>
  );
};

const Question = ({ item = {} }) => {
  const [show, setShow] = useState(false);
  const changeShow = () => {
    setShow(s => !s);
  };
  return (
    <div
      onClick={changeShow}
      className={Classes.join([styles.item, show ? styles.active : ''])}
    >
      <div className="flex j-between a-start">
        <p className="t_supbody bold">{item?.question}</p>
        <img
          className={Classes.join([!show ? styles.open : '', styles.close])}
          src={close}
          alt="icon"
        />
      </div>

      <Animation show={show}>
        <p className={Classes.join(['t_body', show ? styles.active : ''])}>
          {item?.answer}
        </p>
      </Animation>
    </div>
  );
};

export default Questions;
