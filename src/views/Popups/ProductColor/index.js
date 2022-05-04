import React, { useEffect, useState } from 'react';

import { runInAction } from 'mobx';
import { Circle } from 'react-color/lib/components/circle/Circle';
import { useHistory } from 'react-router-dom';

import { Button, Checkbox, Modal } from '../../../components';
import productsStore from '../../../stores/ProductsStore';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

import '../../../assets/styles/style.css';

const ProductColor = () => {
  const history = useHistory();
  const [active, setActive] = useState(0);
  useEffect(() => {
    productsStore._getColors();
  }, []);

  useEffect(() => {
    runInAction(() => {
      setActive(
        Object.keys(productsStore.colors).filter(
          item => productsStore._colors[item].isChecked === true,
        ).length,
      );
    });
  }, [productsStore.colors]);

  useEffect(() => {
    if (productsStore.filterClear === true) {
      setActive(0);
      productsStore._getColors();
    }
  }, [productsStore.filterClear]);

  return (
    <Modal
      filter={true}
      header="Цвет"
      open={true}
      width="100%"
      maxWidth="672px"
      onClose={history.goBack}
    >
      <div className={Classes.join([styles.content, styles.filterSort])}>
        <div className={Classes.join([styles.colorPicker, 'column wrap'])}>
          {productsStore.colors &&
            Object.keys(productsStore.colors).map((item, idx) => {
              return (
                <div className="flex" key={idx}>
                  <Checkbox
                    onInput={() => productsStore.setColor(item)}
                    label={
                      <Circle
                        className="color_picker"
                        colors={[item]}
                        circleSize={25}
                        onChange={() => {}}
                      />
                    }
                    checked={productsStore._colors[item].isChecked}
                  />
                </div>
              );
            })}
        </div>
        <Button
          onClick={() => history.goBack()}
          text="Применить"
          size="middle"
        />
      </div>
    </Modal>
  );
};

export default ProductColor;
