import React from 'react';

import { Classes } from '../../utils';

import bad from './assets/svg/bad.svg';
import check from './assets/svg/check.svg';
import process from './assets/svg/proccess.svg';
import styles from './Badge.module.scss';

const Badge = ({ status }) => {
  if (status === 1) {
    return (
      <div
        className={Classes.join([
          styles.badge,
          styles.done,
          'flex j-between a-center',
        ])}
      >
        <img className={styles.img} src={check} alt="check" />
        <span className="t_footnote">Завершён</span>
      </div>
    );
  } else if (status === 0) {
    return (
      <div
        className={Classes.join([
          styles.badge,
          styles.process,
          'flex j-between a-center',
        ])}
      >
        <img className={styles.img} src={process} alt="process" />
        <span className="t_footnote">В процессе</span>
      </div>
    );
  } else {
    return (
      <div
        className={Classes.join([
          styles.badge,
          styles.break,
          'flex j-between a-center',
        ])}
      >
        <img className={styles.img} src={bad} alt="bad" />
        <span className="t_footnote">Прекращён</span>
      </div>
    );
  }
};

export default Badge;
