import React from 'react';

import FlatList from 'flatlist-react';
import { toJS } from 'mobx';

import { CartItem } from '../../../../components';

import styles from './CartList.module.scss';

const CartList = ({ products = [] }) => {
  const renderItem = (item, idx) => {
    return (
      <CartItem
        cartItemId={item.id}
        key={idx}
        product={toJS(item.product)}
        cart={toJS(item)}
        quantity={toJS(item.quantity)}
      />
    );
  };

  return (
    <div className={styles.cart}>
      <h3 className="mt-45 mb-45">Корзина</h3>
      <FlatList
        renderOnScroll
        list={products}
        renderItem={renderItem}
        renderWhenEmpty={() => <div>Корзина пуста</div>}
      />

      {/*{products.map((item, idx) => {*/}
      {/*    return (*/}
      {/*        <CartItem*/}
      {/*            key={ idx }*/}
      {/*            product={ toJS(item.product) }*/}
      {/*            quantity={ toJS(item.quantity) }/>*/}
      {/*    )*/}
      {/*})}*/}
    </div>
  );
};

export default CartList;
