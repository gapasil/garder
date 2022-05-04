import React, { useEffect, useState } from 'react';

import FlatList from 'flatlist-react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';
import { HashLink } from 'react-router-hash-link';

import { OrderCard } from '../../../components';
import ordersStore from '../../../stores/OrdersStore';
import { Classes } from '../../../utils';
import arrow from '../../ProductPage/components/Reviews/assets/svg/arrow.svg';

import styles from './OrderList.module.scss';

const OrderList = observer(() => {
  const limit = 5;
  const [currentOrders, setCurrentOrders] = useState('active');

  const changeStatus = (e, status) => {
    e.preventDefault();
    setCurrentOrders(s => {
      if (s !== status) {
        ordersStore.getOrders(status);
        return status;
      }
      return s;
    });
  };

  useEffect(() => {
    ordersStore.getOrders(currentOrders);
  }, []);

  const loadOrders = () => {
    ordersStore.getOrders(currentOrders, ordersStore.currentPage + 1);
  };

  const clearOrders = () => {
    ordersStore.getOrders(currentOrders, 1);
  };

  return (
    <div className={styles.list}>
      <MetaTags>
        <title>Заказы | Gardershop – одежда и обувь</title>
      </MetaTags>
      <div className="flex mb-3">
        <a
          className={Classes.join([
            't_h3 mr-2',
            currentOrders === 'active' && styles.active,
          ])}
          onClick={e => changeStatus(e, 'active')}
          href="#"
        >
          Текущие заказы
          {currentOrders === 'active' && (
            <span className="ml-05">{ordersStore?.orders.length}</span>
          )}
        </a>
        <a
          className={Classes.join([
            't_h3 mr-2',
            currentOrders === 'all' && styles.active,
          ])}
          onClick={e => changeStatus(e, 'all')}
          href="#"
        >
          Все заказы
          {currentOrders === 'all' && (
            <span className="ml-05">{ordersStore?.orders.length}</span>
          )}
        </a>
      </div>
      {currentOrders === 'active' && (
        <div>
          {ordersStore.orders && (
            <FlatList
              renderWhenEmpty={() => <p>Список заказов пуст</p>}
              list={toJS(ordersStore.orders)}
              renderItem={(order, idx) => (
                <OrderCard key={idx} order={toJS(order)} />
              )}
              renderOnScroll
            />
          )}
          {ordersStore.currentPage !== ordersStore.pages &&
            ordersStore.orders === [] && (
              <div className="flex j-center">
                <img
                  onClick={loadOrders}
                  className={styles.loadIcon}
                  src={arrow}
                  alt="arrow"
                />
              </div>
            )}
          {ordersStore.currentPage === ordersStore.pages &&
            ordersStore.currentPage !== 1 && (
              <div className={Classes.join(['flex j-center', styles.clear])}>
                <HashLink to="#top" onClick={clearOrders}>
                  Скрыть заказы
                </HashLink>
              </div>
            )}
        </div>
      )}
      {currentOrders === 'all' && (
        <div>
          {ordersStore.orders && (
            <FlatList
              renderWhenEmpty={() => <p>Список заказов пуст</p>}
              list={toJS(ordersStore.orders)}
              renderItem={(order, idx) => <OrderCard key={idx} order={order} />}
              renderOnScroll
            />
          )}
          {ordersStore.currentPage !== ordersStore.pages &&
            ordersStore.orders === [] && (
              <div className="flex j-center">
                <img
                  onClick={loadOrders}
                  className={styles.loadIcon}
                  src={arrow}
                  alt="arrow"
                />
              </div>
            )}
          {/*{ ordersStore.currentPage === ordersStore.pages &&*/}
          {/*<div className={ Classes.join(["flex j-center", styles.clear]) }>*/}
          {/*    <HashLink to='#top' onClick={ clearOrders }>Скрыть заказы</HashLink>*/}
          {/*</div>*/}
          {/*}*/}
        </div>
      )}
    </div>
  );
});

export default OrderList;
