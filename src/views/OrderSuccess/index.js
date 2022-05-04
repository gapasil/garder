import React, { useEffect } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useCookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';

import { Container } from '../../components';
import ordersStore from '../../stores/OrdersStore';
import { Classes } from '../../utils';

import styles from './OrderSuccess.module.scss';

const CreateOrder = observer(() => {
  useEffect(() => {
    ordersStore.getOrders();
  }, []);

  const orders = toJS(ordersStore.orders).map(order => order);
  const [cookies, setCookie] = useCookies(['actionpay']);

  return (
    <Container>
      <MetaTags>
        <title>Подтверждение заказа | Gardershop – одежда и обувь</title>
      </MetaTags>
      <div className={Classes.join([styles['order-success']])}>
        <div className={Classes.join([styles['order-success__wrap']])}>
          <i
            className={Classes.join([styles['order-success__icon'], 'mr-2'])}
          />
          <span
            className={Classes.join([styles['order-success__text'], 'bold'])}
          >
            Заказ успешно оформлен!
          </span>
        </div>
        <div style={{ display: 'none' }}>
          {orders.map(order => (
            <img
              src={`https://apartpx.com/ok/21055.png?actionpay=${cookies?.actionpay}&apid=${order.id}&price=${order.bill.total}`}
              height="1"
              width="1"
            />
          ))}
        </div>
        <a
          href="/profile/orders"
          className={Classes.join([styles['order-success__back'], 'mt-7'])}
        >
          Перейти к Моим заказам
        </a>
      </div>
    </Container>
  );
});

export default CreateOrder;
