import React from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { HashLink } from 'react-router-hash-link';

import { Button, Line, Shipping } from '../../../../components';
import cartStore from '../../../../stores/CartStore';
import { FormatPrice } from '../../../../utils';

import styles from './CartTotal.module.scss';

const CartTotal = observer(({ bill, orderButton }) => (
  <div className={styles.total}>
    <h3 className="mt-45 mb-45">Итого</h3>
    <div className="flex j-between a-center">
      <p className="t_body">Промежуточный итог</p>
      <span>{bill?.products && FormatPrice(bill.products.toString())} ₸</span>
    </div>
    <Shipping shop={bill} delivery={bill} />
    <Line />
    <div className="flex j-between a-center mt-25 mb-25">
      <p className="t_body">Итог</p>
      <span className="bold">
        {FormatPrice(toJS(cartStore.cartCost.toString()))} ₸
      </span>
    </div>
    <Line />
    <div className="mt-25 flex column a-center j-center">
      <HashLink to="/createOrder#top">
        <Button
          disabled={!orderButton?.isAvailable}
          size="middle"
          text="Перейти к оформлению"
        />
      </HashLink>
      {orderButton?.reason === 'product-is-not-available' && (
        <p>один или несколько товаров были удалены или их нет в наличии</p>
      )}
      {orderButton?.reason === 'delivery-conflict' && (
        <p>
          в корзине товары, из магазинов, которые доставляют в разные города и у
          которых нет доставки по стране
        </p>
      )}
      {orderButton?.reason === 'empty-cart' && (
        <p className="mt-1">В корзине нет товаров</p>
      )}
    </div>
  </div>
));

export default CartTotal;
