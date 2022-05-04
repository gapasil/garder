import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { Modal } from '../../../components';
import productsStore from '../../../stores/ProductsStore';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const sortList = [
  { id: 0, title: 'По популярности' },
  { id: 1, title: 'По росту цены' },
  { id: 2, title: 'По убыванию цены' },
  { id: 3, title: 'По новизне' },
  // {id: 4, title: 'По скидкам'},
];
const ProductSort = observer(() => {
  const history = useHistory();
  const [sort, setSort] = useState(productsStore.filter.sort);
  const changeSort = (id, title) => {
    productsStore.setFilter('sort', id);
    productsStore.setFilterString('sort', title);
    setSort(id);
    history.goBack();
  };
  useEffect(() => {
    if (productsStore.filterClear === true) {
      setSort(0);
    }
  }, [productsStore.filterClear]);

  return (
    <Modal
      filter={true}
      header="Сортировка"
      open={true}
      width="100%"
      maxWidth="672px"
      onClose={history.goBack}
    >
      <div className={Classes.join([styles.content, styles.filterSort])}>
        {sortList.map(item => (
          <div
            onClick={() => changeSort(item.id, item.title)}
            className={Classes.join([
              styles.sort,
              sort === item.id ? styles.active : '',
              't_sub',
            ])}
            key={item.id}
          >
            {item.title}
          </div>
        ))}
      </div>
    </Modal>
  );
});

export default ProductSort;
