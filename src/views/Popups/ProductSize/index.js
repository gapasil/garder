import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Checkbox, Modal } from '../../../components';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const ProductSize = () => {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState([
    { id: 1, title: 'XS', isChecked: false },
    { id: 2, title: 'S', isChecked: false },
    { id: 3, title: 'M', isChecked: false },
    { id: 4, title: 'L', isChecked: false },
    { id: 5, title: 'XL', isChecked: false },
  ]);

  const handleCheck = id => {
    const itemIndex = size.findIndex(item => item.id === id);
    const item = size[itemIndex];

    const newItem = {
      ...item,
      isChecked: !item.isChecked,
    };

    setSize(s => {
      return [...s.slice(0, itemIndex), newItem, ...s.slice(itemIndex + 1)];
    });
  };

  const handleClick = () => {
    setActive(size.filter(item => item.isChecked === true).length);
    history.goBack();
  };

  const history = useHistory();
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
            {size &&
              size.map(item => (
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
};

export default ProductSize;
