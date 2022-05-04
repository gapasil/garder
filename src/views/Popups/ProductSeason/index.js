import React, { useState } from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { Button, Checkbox, Modal } from '../../../components';
import productsStore from '../../../stores/ProductsStore';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const ProductSeason = observer(() => {
  const history = useHistory();
  const [active, setActive] = useState(0);

  const [seasons, setSeasons] = useState(productsStore.filter.season);

  const handleCheck = id => {
    const itemIndex = seasons.findIndex(item => item.id === id);
    const item = seasons[itemIndex];

    const newItem = {
      ...item,
      isChecked: !item.isChecked,
    };

    setSeasons(s => {
      runInAction(() => {
        productsStore.filter.season = [
          ...s.slice(0, itemIndex),
          newItem,
          ...s.slice(itemIndex + 1),
        ];
      });
      return [...s.slice(0, itemIndex), newItem, ...s.slice(itemIndex + 1)];
    });
  };

  const handleClick = () => {
    setActive(seasons.filter(item => item.isChecked === true).length);
    const activeStr = seasons
      .filter(item => item.isChecked === true)
      .map(item => item.title)
      .join(',');
    productsStore.setFilter('season', seasons);
    productsStore.setFilterString('season', activeStr);
    history.goBack();
  };

  return (
    <Modal
      filter={true}
      header="Размеры"
      open={true}
      width="100%"
      maxWidth="672px"
      onClose={history.goBack}
    >
      <div className={Classes.join([styles.content, styles.filterSort])}>
        <div className={styles.seasons}>
          <div className={styles.list}>
            {seasons &&
              seasons.map(item => (
                <div key={item.id}>
                  <Checkbox
                    onInput={() => handleCheck(item.id)}
                    label={item.title}
                    checked={item.isChecked}
                  />
                </div>
              ))}
          </div>
          <div className={styles.line}></div>
          <Button onClick={handleClick} text="Применить" size="middle" />
        </div>
      </div>
    </Modal>
  );
});

export default ProductSeason;
