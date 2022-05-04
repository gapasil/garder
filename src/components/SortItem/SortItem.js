import React, { useState } from 'react';

import { Classes } from '../../utils';
import { Animation } from '../index';

import arrow from './assets/svg/arrow.svg';
import arrow_white from './assets/svg/arrow_white.svg';
import styles from './SortItem.module.scss';

const SortItem = ({ title, status, children }) => {
  const [visible, setVisible] = useState(null);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(true)}
      className={Classes.join([styles.sort, styles[status]])}
    >
      <span className="t_sub flex mr-15">
        {title}
        {!status ? (
          <img src={arrow} alt="sort arrow" />
        ) : (
          <img src={arrow_white} alt="sort arrow" />
        )}
      </span>
      <Animation show={visible}>
        <div className={styles.content}>{children}</div>
      </Animation>
    </div>
  );
};

export default SortItem;
