import React, { useEffect, useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import API from '../../services/api';

import heart from './assets/svg/heart.svg';
import heart_active from './assets/svg/heart_active.svg';
import styles from './Favourite.module.scss';

const defaultProduct = {};
const Favourite = observer(
  ({ product = {}, info = false, cart = false, ...props }) => {
    const [status, setStatus] = useState(
      info
        ? product && toJS(product.isFavorite)
        : product && toJS(product.isFavorite),
    );
    // const [status, setStatus] = useState(productStore.product.product && productStore.product.product.isFavorite);
    // useEffect(() => {
    //     productStore.getProduct(product.id)
    // }, [])

    useEffect(() => {
      setStatus(
        info
          ? product && toJS(product.isFavorite)
          : product && toJS(product.isFavorite),
      );
    }, [product]);
    const onAddFavourite = async () => {
      if (status === false) {
        await API.post('favorites/add', toJS({ productId: product.id }));
        setStatus(true);
        // productStore.setFavorite(true);
      } else {
        await API.post('favorites/remove', toJS({ productId: product.id }));
        setStatus(false);
        // productStore.setFavorite(false);
      }
    };
    if (status) {
      return (
        <span className={styles.favContainer} onClick={onAddFavourite}>
          <img
            {...props}
            className={styles.favourite}
            src={heart_active}
            alt="favourite"
          />
          {cart && <span>Удалить из избранного</span>}
        </span>
      );
    } else {
      return (
        <span className={styles.favContainer} onClick={onAddFavourite}>
          <img
            {...props}
            className={styles.favourite}
            src={heart}
            alt="favourite"
          />
          {cart && <span>Добавить в избранное</span>}
        </span>
      );
    }
  },
);

export default Favourite;
