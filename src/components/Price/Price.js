import React from 'react';

import { Classes } from '../../utils';
import Prisemount from "../Pricemount/Pricemount"

import styles from './Price.module.scss';

const Price = ({ old = '', current = '' }) => (
  <div className={Classes.join([styles.price, 'flex a-end mt-1'])}>
    <div className={styles.blockSum}>
      <span className={Classes.join([styles.strike, 't_sub'])}>{old}</span>
      <span className={styles.actual}>{current}</span>
    </div>
    <Prisemount current={current}/>
  </div>
);

export default Price;
