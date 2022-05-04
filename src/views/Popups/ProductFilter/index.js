import React from 'react';

import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';

import {
  Button,
  Colors,
  Modal,
  Prices,
  Seasons,
  Size,
  Sort,
} from '../../../components';
import { Brand } from '../../../components/Pickers';
import productsStore from '../../../stores/ProductsStore';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const list = [
  {
    title: 'Сортировка',
    value: 'sort',
    link: 'productSort',
    component: <Sort />,
  },
  // { title : 'Размеры',link:'productSize', component : <Size/> },
  {
    title: 'Сезон',
    value: 'season',
    link: 'productSeason',
    component: <Seasons />,
  },
  {
    title: 'Цвет',
    value: 'colors',
    link: 'productColor',
    component: <Colors />,
  },
  {
    title: 'Цена',
    value: 'price',
    link: 'productPrice',
    component: <Prices />,
  },
  {
    title: 'Размер',
    value: 'size',
    link: 'productSize',
    component: <Size />,
  },
  {
    title: 'Бренд',
    value: 'brand',
    link: 'productBrand',
    component: <Brand />,
  },
];

const ProductFilter = observer(() => {
  const history = useHistory();
  return (
    <Modal
      arrow={true}
      header="Фильтр"
      open={true}
      width="100%"
      maxWidth="440px"
      onClose={history.goBack}
    >
      <div className={styles.listContainer}>
        {list &&
          list.map((item, idx) => (
            <div key={idx} className={Classes.join([styles.listCat, 't_sub'])}>
              <Link to={`?popup=${item.link}`}>
                {item.title}
                <span className="c_gray">
                  {productsStore.filterString[item.value]}
                </span>
                {item.title === 'Цена' && (
                  <span className="c_gray">
                    {productsStore.filter.price_from !== 'aN'
                      ? productsStore.filter.price_from
                      : ''}{' '}
                    {productsStore.filter.price_to
                      ? `- ${productsStore.filter.price_to}`
                      : ''}
                  </span>
                )}

                {item.title === 'Цвет' && (
                  <span className="c_gray">{productsStore.filter.color}</span>
                )}
              </Link>
            </div>
          ))}

        <div className={styles.btnGroup}>
          <Button
            onClick={productsStore.clearFilter}
            text="Очистить"
            size="middle"
            theme="invers"
          />
          <Button onClick={history.goBack} text="Применить" size="middle" />
        </div>
      </div>
    </Modal>
  );
});

export default ProductFilter;
