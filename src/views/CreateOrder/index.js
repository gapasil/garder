import React from 'react';

import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';

import { Container } from '../../components';

import OrderForm from './components/OrderForm/OrderForm';

const getMeta = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Оформление заказа',
      },
    ],
  };
};

const CreateOrder = observer(() => (
  <Container>
    <MetaTags>
      <title>Оформление заказа | Gardershop – одежда и обувь</title>
      <script type="application/ld+json">{JSON.stringify(getMeta())}</script>
    </MetaTags>
    <h3 className="mt-4 mb-4">Оформление заказа</h3>
    <div className="flex wrap">
      <OrderForm />
    </div>
  </Container>
));

export default CreateOrder;
