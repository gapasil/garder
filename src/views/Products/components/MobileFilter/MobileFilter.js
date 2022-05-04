import React from 'react';

import { Link } from 'react-router-dom';

import { Classes } from '../../../../utils';

import filter from './assets/filter.svg';
import styles from './MobileFilter.module.scss';

const sortList = [
  { id: 1, title: 'По популярности' },
  { id: 2, title: 'По росту цены' },
  { id: 3, title: 'По убыванию цены' },
  { id: 4, title: 'По новизне' },
  { id: 5, title: 'По скидкам' },
];

const MobileFilter = () => {
  return (
    <Link
      to="?popup=productFilter"
      className={Classes.join(['flex a-center mb-1', styles.filterBtn])}
    >
      <img className="mr-1" src={filter} alt="icon" />
      Фильтры
    </Link>
    // <div className={ Classes.join(["flex a-end mb-15", styles.component]) }>
    //     <Sort/>
    //     <Size/>
    //     <Seasons/>
    //     <Colors/>
    //     <Price/>
    //     <span className={ Classes.join(['t_sub', styles.clear]) }>Очистить</span>
    // </div>
  );
};

export default MobileFilter;
