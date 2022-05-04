import React from 'react';

import { observer } from 'mobx-react';

import { Colors, Prices, Seasons, Size, Sort } from '../../../../components';
import { Brand } from '../../../../components/Pickers';
// eslint-disable-next-line import/namespace
import productsStore from '../../../../stores/ProductsStore';
import { Classes } from '../../../../utils';

import styles from './Filter.module.scss';

const Filter = observer(() => {
  return (
    <div className={Classes.join(['flex a-end mb-15', styles.component])}>
      <Sort />
      <Seasons />
      <Colors />
      <Prices />
      <Size />
      <Brand />
      <span
        onClick={productsStore.clearFilter}
        className={Classes.join(['t_sub', styles.clear])}
      >
        Очистить
      </span>
    </div>
  );
});

export default Filter;
