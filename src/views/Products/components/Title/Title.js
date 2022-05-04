import React from 'react';

import { Classes } from '../../../../utils';

import styles from './Title.module.scss';

const Title = ({ title, countOfProducts }) => (
  <div
    className={Classes.join([styles.productsHeader, 'flex a-end mt-4 mb-4'])}
  >
    <h3>{title}</h3>
    <span className="t_footnote">Товаров: {countOfProducts}</span>
  </div>
);

export default Title;
