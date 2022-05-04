import React, { useEffect } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';

import { Container } from '../../components';
import store from '../../stores';
import cartStore from '../../stores/CartStore';
import { CardSlider } from '../utils';

import CartList from './components/CartList/CartList';
import CartTotal from './components/CartTotal/CartTotal';

const getMeta = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Корзина',
      },
    ],
  };
};

const Cart = observer(() => {
  useEffect(() => {
    cartStore._getCart();
  }, [store.itemsInCart]);

  const data = toJS(cartStore.cart);

  return (
    <Container>
      <MetaTags>
        <title>Корзина | Gardershop – одежда и обувь</title>
        <script type="application/ld+json">{JSON.stringify(getMeta())}</script>
      </MetaTags>
      <div className="flex wrap j-between">
        <CartList products={data?.cart} />
        <CartTotal orderButton={data?.orderButton} bill={data?.bill} />
      </div>
      <CardSlider products={data?.alsoBuy} title="Вам может понравиться" />
    </Container>
  );
});

export default Cart;
