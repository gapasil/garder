import React, { useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import API from '../../services/api';
import store from '../../stores';
import ordersStore from '../../stores/OrdersStore';
import { Classes, FormatPrice } from '../../utils';
import { Button, Line } from '../index';

import styles from './OrderCard.module.scss';

const OrderCard = observer(({ order = {} }) => {
  const [redirect, setRedirect] = useState('');
  const tracking =
    order.tracking &&
    order.tracking.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {});

  const notStatus = [
    'ONLINE_KASPI',
    'IP_KASPI',
    'IP_HOMECREDITBANK',
    'IP_ALPHABANK',
    'IP_HALYKBANK',
  ];
  const cancelOrder = async () => {
    try {
      store.toggleLoading(true);
      const { data } = await API.post(
        'orders/cancel',
        toJS({ orderId: order.id }),
      );
      ordersStore.getOrders();
    } catch {
    } finally {
      store.toggleLoading(false);
    }
  };

  //CloudPayments
  const pay = () => {
    const widget = new cp.CloudPayments();
    widget.pay(
      'charge', // обязательно 'charge'!
      {
        //options
        publicId: 'pk_69b38b18d1d43d70319bf66535e33', // public id gardershop - константа
        description: 'Оплата заказа - GARDERSHOP', //назначение
        amount: order.bill.total, //сумма
        currency: 'KZT', //валюта
        accountId: null, //иденти
        // фикатор плательщика (необязательно)
        skin: 'modern', //дизайн виджета (необязательно)
        data: {
          orderIds: [order.id],
          hash: order.cpPayButton.m,
          // значение из  "m"
        },
      },
      {
        onSuccess: function (options) {
          // success
          toast('Оплата прошла успешно!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
          });
          ordersStore.getOrders();
          setRedirect('/success');
        },
        onFail: function (reason, options) {
          // fail
          toast('Прервано!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
          });
          ordersStore.getOrders();
          setRedirect('/profile/orders');
        },
        onComplete: function (paymentResult, options) {
          //...
        },
      },
    );
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className={styles.order}>
      <div className={styles.card}>
        <div className={styles.num}>
          <span className="t_body flex j-between a-center">
            Заказ № {order?.id}
            {order?.cancelButton?.isVisible && (
              <span onClick={cancelOrder} className={styles.cancelOrder}>
                Отменить заказ
              </span>
            )}
          </span>
        </div>
        <div
          className={Classes.join([
            styles.status,
            order.status > 0 && styles.processed,
            order.status === 2 && styles.way,
            order.status === 3 && styles.done,
          ])}
        >
          {order.status === -1 && <p className="mt-15">Заказ отменен</p>}

          {order.status === 0 && notStatus.indexOf(order.paymentMethod) > -1 ? (
            <p className="mt-15">
              Заказ создан. В скором времени с Вами свяжется менеджер для оплаты
              заказа
            </p>
          ) : (
            order.status === 0 &&
            order.paymentMethod === 'ONLINE_CP' && (
              <p className="mt-15">Заказ не оплачен</p>
            )
          )}

          {order.status > 0 && (
            <>
              <div className={styles.item}>
                <div className={styles.point}></div>
                {order.status > 0 && (
                  <div>
                    <p className="t_sub">Заказ создан</p>
                    <span
                      className={Classes.join([
                        't_footnote c_gray',
                        order.status > 0 && styles.visible,
                      ])}
                    >
                      {tracking.created.date}
                    </span>
                  </div>
                )}
              </div>
              <div className={styles.item}>
                <div className={styles.point}></div>
                <div>
                  <p className="t_sub">Заказ в пути</p>

                  <span
                    className={Classes.join([
                      't_footnote c_gray',
                      order.status === 2 && styles.visible,
                    ])}
                  >
                    {tracking.accepted.date}
                  </span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.point}></div>
                <div>
                  <p className="t_sub">{order.address}</p>
                  <span
                    className={Classes.join([
                      't_footnote c_gray',
                      order.status === 3 && styles.visible,
                    ])}
                  >
                    {tracking.finished.date}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="products">
          {order.products.map((item, idx) => (
            <div
              key={idx}
              className={Classes.join(['flex j-between', styles.product])}
            >
              <div className="flex a-center">
                <img src={item.img} alt="image" />
                <div className={Classes.join(['t_body', styles.text])}>
                  <p>{item?.name}</p>
                  <p className="c_gray">
                    Количество <span className="c_black">{item?.quantity}</span>
                  </p>
                </div>
              </div>
              <div
                className={Classes.join(['flex j-between t_body', styles.info])}
              >
                <div className="mr-5">
                  {item.parameters &&
                    item.parameters.map((item, idx) => {
                      if (item.name === 'colorway') {
                        return (
                          <p key={idx} className="c_gray">
                            Цвет: <span className="c_black">{item.value}</span>
                          </p>
                        );
                      }
                      if (item.name === 'size') {
                        return (
                          <p key={idx} className="c_gray">
                            Размер:{' '}
                            <span className="c_black">{item.value}</span>
                          </p>
                        );
                      }
                    })}
                </div>
                <div className={styles.price}>
                  {/*<p className='c_gray'>300 000 ₸</p>*/}
                  <p className="c_black">
                    {FormatPrice(item.price.toString())} ₸
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.total}>
        <div>
          <p>Количество товаров:</p>
          <span>1</span>
        </div>
        <div>
          <p>Стоимость:</p>
          <span>{FormatPrice(order.bill.products.toString())} ₸</span>
        </div>
        <div>
          <p>Доставка:</p>
          <span>
            {order.bill.delivery === 0
              ? 'Бесплатно'
              : FormatPrice(order.bill.delivery.toString() + ' ₸')}
          </span>
        </div>
        <Line />
        <div>
          <p>Итог</p>
          <span className="bold">
            {FormatPrice(order.bill.total.toString())} ₸
          </span>
        </div>
        {order?.cpPayButton?.isVisible && (
          <div className={styles.payButton}>
            <Button onClick={pay} text="Оплатить" />
          </div>
        )}
      </div>
    </div>
  );
});

export default OrderCard;
