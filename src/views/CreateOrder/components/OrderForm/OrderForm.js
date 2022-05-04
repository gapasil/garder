import React, { useEffect, useState, useMemo } from 'react';

import {
  Button,
  Form,
  Input,
  Line,
  RadioButton,
  Shipping,
} from '../../../../components';

import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/ru';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { useForm, Controller } from 'react-hook-form';
import MediaQuery from 'react-responsive/src/Component';
import {Redirect, useHistory} from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';

import PhoneInput from '../../../../components/PhoneInput/PhoneInput';
import API from '../../../../services/api';
import store from '../../../../stores';
import cartStore from '../../../../stores/CartStore';
import ordersStore from '../../../../stores/OrdersStore';
import { Classes } from '../../../../utils';

import styles from './OrderForm.module.scss';

const payments = [
  { label: 'Оплата картой', value: 'ONLINE_CP' },
  { label: 'Рассрочка', value: 'installment' }
];

const installmentBanks = [
  { label: 'Zoodpay', value: 'IP_ZOODPAY' },
  { value: 'IP_KASPI', label: 'Kaspi Bank' },
  { value: 'IP_HOMECREDITBANK', label: 'Банк Хоум Кредит' },
  { value: 'IP_ALPHABANK', label: 'Альфа Банк' },
  { value: 'IP_HALYKBANK', label: 'Halyk Bank' },
];

const deliveries = [
  { label: 'Как можно быстрее', value: 0 },
  { label: 'К определённому времени', value: 1 },
  { label: 'Согласовать', value: 2 },
];

const OrderForm = observer(() => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const [redirect, setRedirect] = useState('');
  const [delivery, setDelivery] = useState(deliveries[1].value);
  const cities = Object.values(toJS(store.cities)).map(item => ({
    value: item.name,
    label: item.name,
  }));

  const payment = watch('payment')
  const installment = watch('installment')

  const history = useHistory()

  useEffect(() => {
    cartStore._getCart();
  }, []);

  const cart = toJS(cartStore?.cart);
  const itemIds = useMemo(() => cart?.cart?.map(item => item.id), [cart]);

  const availableCities = useMemo(() => {
    if (
      cart?.cart?.filter(order => !order.delivery.countryDelivery)?.length === 1
    ) {
      const city = cart?.cart?.find(order => !order.delivery.countryDelivery)
        ?.delivery?.cityName;
      return [{ value: city, label: city }];
    }

    if (
      cart?.cart?.filter(order => !order.delivery.countryDelivery)?.length > 1
    ) {
      setError('cityName', {
        type: 'value',
        message: 'Товары не доставляются в Ваш город',
      });
      return [];
    }

    return cities;
  }, [cart, cities]);

  const onSubmit = async form => {
    const info = {
      itemIds,
      recepient: {
        phone: form.phone.replace(/\s+/g, ''),
        email: form.email,
        cityName: form.cityName.value,
        address: form.flat
          ? `${form.street} ${form.house} ${form.flat}`
          : `${form.street} ${form.house}`,
        name: form.name,
        zipCode: form.zipCode,
      },
      paymentMethod:
        form.payment === 'installment' ? form.installment.value : form.payment,
      deliveryDate: {
        type: Number(form.delivery),
      },
      comment: form.comment,
    };

    if (Number(form.delivery) === 1) {
      info.deliveryDate.date = `${form.date}, ${form.time}`;
    }

    const { data } = await API.post('orders/new', toJS(info));

    if(form?.installment?.value === 'IP_ZOODPAY') {
      window.location.replace(data.zoodpay.url)
    }

    if (form.payment === 'ONLINE_CP') {
      pay(data.createdOrderIds, data.m, data.amount);
    }

    if(form?.installment?.value !== 'IP_ZOODPAY') {
      setRedirect('/success');
    }
    store.setItemsInCart(0);
  };

  //CloudPayments
  const pay = (createdOrderIds, m, amount) => {
    const widget = new cp.CloudPayments();
    widget.pay(
      'charge', // обязательно 'charge'!
      {
        //options
        publicId: 'pk_69b38b18d1d43d70319bf66535e33', // public id gardershop - константа
        description: 'Оплата заказа - GARDERSHOP', //назначение
        amount: amount, //сумма
        currency: 'KZT', //валюта
        accountId: null, //идентификатор плательщика (необязательно)
        skin: 'modern', //дизайн виджета (необязательно)
        data: {
          orderIds: createdOrderIds,
          hash: m,
          // значение из  "m"
        },
      },
      {
        onSuccess: function () {
          // success
          toast('Оплата прошла успешно!', {
            position: toast.POSITION.TOP_CENTER,
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
          });
          ordersStore.getOrders();
          setRedirect('/success');
        },
        onFail: function () {
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

  let counts;
  if (
    (itemIds?.length % 10 > 4 && itemIds?.length % 10 < 10) ||
    (itemIds?.length > 10 && itemIds?.length < 15) ||
    itemIds?.length % 10 === 0
  ) {
    counts = ' товаров ';
  } else if (itemIds?.length % 10 > 1 && itemIds?.length % 10 < 5) {
    counts = ' товара ';
  } else {
    counts = ' товар ';
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className={styles.order}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex j-between a-center mb-25">
          <span>Имя и фамилия</span>
          <div className="flex column">
            <Input
              invalid={errors.name && true}
              {...register('name', {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.name && <p>Это поле необходимо заполнить</p>}
          </div>
        </label>

        <label className="flex j-between a-center mb-25">
          <span>Номер телефона</span>

          <div className="flex column">
            <PhoneInput
              invalid={errors.phone && true}
              {...register('phone', { required: true })}
            />
            {errors.phone && <p>Это поле необходимо заполнить</p>}
          </div>
        </label>

        <label className="flex j-between a-center mb-25">
          <span>Город</span>
          <div className={styles.selectors}>
            <Controller
              name="cityName"
              isClearable
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={availableCities}
                  className={styles.select}
                  placeholder=""
                  styles={{
                    placeholder: provider => ({
                      ...provider,
                      fontSize: '16px',
                    }),
                  }}
                />
              )}
            />
            {errors.cityName && <p>Это поле необходимо заполнить</p>}
          </div>
        </label>

        <label className="flex j-between a-center mb-25 ">
          <span>Адрес</span>
          <div className="flex column">
            <Input
              placeholder="Улица"
              className="mb-25"
              invalid={errors.street && true}
              {...register('street', {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.street && <p>Это поле необходимо заполнить</p>}

            <div className="flex" style={{ gap: '10px' }}>
              <label className="gr-1">
                <Input
                  invalid={errors.house && true}
                  placeholder="Дом"
                  {...register('house', {
                    required: true,
                    maxLength: 100,
                  })}
                />
                {errors.house && <p>Это поле необходимо заполнить</p>}
              </label>
              <label className="gr-1">
                <Input
                  invalid={errors.flat && true}
                  placeholder="Квартира"
                  {...register('flat', {
                    maxLength: 100,
                  })}
                />
              </label>
              <label className="gr-1">
                <Input
                  invalid={errors.flat && true}
                  placeholder="Индекс"
                  {...register('zipCode', {
                    maxLength: 100,
                  })}
                />
              </label>
            </div>
          </div>
        </label>

        <label className="flex j-between a-center mb-25">
          <span>Время доставки</span>
          <Controller
            control={control}
            rules={{ required: true }}
            name="delivery"
            defaultValue={deliveries[1].value}
            render={({ field }) => (
              <div>
                {deliveries.map((item, idx) => {
                  return (
                    <RadioButton
                      {...field}
                      key={idx}
                      name="delivery"
                      label={item.label}
                      value={item.value}
                      onClick={() => setDelivery(item.value)}
                      active={delivery === item.value}
                    />
                  );
                })}
              </div>
            )}
          />
          {errors.delivery && <p>Это поле необходимо заполнить</p>}
        </label>

        {delivery === 1 && (
          <div className="flex a-center mb-25">
            <div
              className={Classes.join(['flex relative', styles.timeDeliveries])}
            >
              <Controller
                name="date"
                isClearable
                rules={{ required: delivery === 1 }}
                control={control}
                render={() => (
                  <DayPickerInput
                    classNames={styles.wrapper}
                    inputProps={{ className: styles.dayInput }}
                    onDayChange={e => {
                      setValue('date', formatDate(e, 'D MMMM'));
                    }}
                    dayPickerProps={{
                      fromMonth: new Date(),
                      locale: 'ru',
                      localeUtils: MomentLocaleUtils,
                      className: styles.wrapper,
                      modifiersStyles: {
                        wrapper: {
                          borderRadius: '30px',
                        },
                        selected: {
                          color: '#fff',
                          background: '#4853A2',
                          borderRadius: '8px',
                        },
                      },
                    }}
                    format="D MMMM"
                    placeholder={`Дата`}
                    formatDate={formatDate}
                    parseDate={parseDate}
                  />
                )}
              />
              в
              <input
                {...register('time')}
                className={styles.dayInput}
                type="time"
              />
            </div>
            {errors.date && <p>Это поле необходимо заполнить</p>}
          </div>
        )}

        <label className="flex j-between a-center mb-25">
          <span>Способ оплаты</span>
          <div className={styles.selectors}>
            <Controller
              name="payment"
              control={control}
              defaultValue={payments[0].value}
              rules={{ required: true }}
              render={({ field }) => (
                <div>
                  {payments.map((item, idx) => {
                    return (
                      <RadioButton
                        {...field}
                        key={idx}
                        name="payment"
                        label={item.label}
                        value={item.value}
                        active={payment === item.value}
                      />
                    );
                  })}
                </div>
              )}
            />
            {errors.payment && <p>Это поле необходимо заполнить</p>}
          </div>
        </label>

        {payment === 'installment' && (
          <label className="flex j-between a-center mb-25">
            <span>Банк/организация</span>
            <div className={styles.selectors}>
              <Controller
                name="installment"
                isClearable
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={installmentBanks}
                    className={styles.select}
                    placeholder=""
                    styles={{
                      placeholder: provider => ({
                        ...provider,
                        fontSize: '16px',
                      }),
                    }}
                  />
                )}
              />
              {errors.installment && <p>Это поле необходимо заполнить</p>}
            </div>
          </label>
        )}

        {installment?.value === 'IP_ZOODPAY' && (
          <label className="flex j-between a-center mb-25">
            <span>Email</span>
            <div className="flex column">
              <Input
                invalid={errors.name && true}
                {...register('email', {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.email && <p>Это поле необходимо заполнить</p>}
            </div>
          </label>
        )}

        <label className="flex j-between a-start mb-25 ">
          <span>Комментарий к заказу</span>

          <Controller
            name="comment"
            isClearable
            control={control}
            render={({ field }) => <textarea {...field} />}
          />
        </label>

        <div
          className={Classes.join([
            styles.payment,
            'mt-4 pt-25 pr-25 pb-25 pl-25',
          ])}
        >
          <h4 className="mb-25">
            {itemIds?.length}
            {counts}
            на сумму {cartStore.cost} ₸
          </h4>
          <div className="flex wrap j-between">
            <div className={styles.total}>
              <MediaQuery maxWidth={680}>
                <p className="t_h3 mt-25">Итого</p>
              </MediaQuery>
              <div className="flex j-between a-center">
                <p className="t_body">Товаров на сумму</p>
                <span>{cartStore.cost} ₸</span>
              </div>
              <Shipping
                delivery={toJS(cartStore.cart?.bill)}
                shop={toJS(cartStore.cart?.bill)}
              />
              <Line />
              <div className="flex t_body j-between a-center mt-25 mb-25">
                <p className="bold">Итого:</p>
                <span className="bold">{cartStore.cartCost} ₸</span>
              </div>
            </div>
          </div>
          <div className={Classes.join(['mt-25', styles.offert])}>
            <p className="mb-25">
              Нажимая на кнопку «Оформить заказ», вы принимаете условия{' '}
              <a href="#">Публичной оферты</a>
            </p>
            <Button
              onClick={handleSubmit(onSubmit)}
              text="Оформить заказ"
              size="middle"
            />
          </div>
        </div>
      </Form>
    </div>
  );
});
export default OrderForm;
