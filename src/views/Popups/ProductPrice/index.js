import React, { useEffect, useState } from 'react';

import { runInAction } from 'mobx';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button, Form, Input, Modal } from '../../../components';
import productsStore from '../../../stores/ProductsStore';
import { Classes, FormatPrice } from '../../../utils';
import styles from '../Popups.module.scss';

const ProductPrice = () => {
  const rangeTemplate = [
    { title: 'До 1000 ₸', range: { price_from: '', price_to: '1000' } },
    { title: 'До 5000 ₸', range: { price_from: '', price_to: '5000' } },
    { title: 'До 10 000 ₸', range: { price_from: '', price_to: '10000' } },
    { title: 'До 15 000 ₸', range: { price_from: '', price_to: '15000' } },
    { title: 'До 30 000 ₸', range: { price_from: '', price_to: '30000' } },
    { title: 'От 30 000 ₸', range: { price_from: '30000', price_to: '' } },
  ];

  const history = useHistory();
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [range, setRange] = useState({
    price_to: productsStore.filter.price_to,
    price_from: productsStore.filter.price_from,
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      price_to: productsStore.filter.price_to,
      price_from: productsStore.filter.price_from,
    },
  });
  const handleClick = () => {
    setActive(range.from || range.to);
  };
  useEffect(() => {
    if (productsStore.filterClear === true) {
      setRange({ price_to: '', price_from: '' });
      productsStore.setFilter('price_from', null);
      productsStore.setFilter('price_to', null);
      // reset({
      //     price_to: '', price_from: ''
      // });
    }
  }, [productsStore.filterClear]);

  const handleChange = (name, value) => {
    setActive(false);
    const val = FormatPrice(value.replace(/\D/, ''));

    setValue(name, val);
    // setRange(s => ({...s, [name]: val}));
    // productsStore.setFilter(name, val);
    // if (parseInt(range.price_from) > parseInt(range.price_to)) {
    //     setDisabled(true);
    // } else {
    //     setDisabled(false);
    // }
  };
  const onPress = async form => {
    setActive(true);
    const range = form;

    range.price_from = FormatPrice(
      parseInt(range.price_from.replace(/\D/, '')).toString(),
    );
    range.price_to = range.price_to === '0' ? '' : range.price_to;

    range.price_to =
      range.price_to !== ''
        ? FormatPrice(
            parseInt(range.price_to.toString().replace(/\D/, '')).toString(),
          )
        : '';

    // range.price_to = range.price_to === '' ? null: ;

    form.price_to = form.price_to === '' ? null : form.price_to;
    setRange(range);
    try {
      runInAction(() => {
        productsStore.filter = {
          ...productsStore.filter,
          price_from: form.price_from.replace(/\D/, ''),
          price_to: form.price_to.replace(/\D/, ''),
        };
      });
      // productsStore.setFilter('price_from', form.price_from.replace(/\D/, ''));
      // productsStore.setFilter('price_to', form.price_to.replace(/\D/, ''));
    } catch (error) {
    } finally {
      // store.toggleLoading(false);
    }
    history.goBack();
  };

  const changeFromTemplate = obj => {
    setRange(obj);
    setValue('price_to', obj.price_to);
    setValue('price_from', obj.price_from);
    runInAction(() => {
      productsStore.filter = {
        ...productsStore.filter,
        price_from: obj.price_from.replace(/\D/, ''),
        price_to: obj.price_to.replace(/\D/, ''),
      };
    });
    // productsStore.setFilter('price_from', obj.price_from.replace(/\D/, ''));
    // productsStore.setFilter('price_to', obj.price_to.replace(/\D/, ''));
  };

  return (
    <Modal
      filter={true}
      header="Цена"
      open={true}
      width="100%"
      maxWidth="672px"
      onClose={history.goBack}
    >
      <div className={Classes.join([styles.content, styles.filterSort])}>
        <div className={styles.seasons}>
          <div className={styles.list}>
            <Form onSubmit={handleSubmit(onPress)}>
              <div className="flex a-center mr-15">
                От
                <Input
                  type="text"
                  {...register('price_from', {
                    // setValueAs : v => parseInt(v),
                    min: 0,
                  })}
                  name="price_from"
                  onInput={handleChange}
                />
              </div>
              <div className="flex a-center">
                До
                <Input
                  {...register('price_to', {
                    // setValueAs : v => parseInt(v),
                    min: 0,
                  })}
                  name="price_to"
                  onInput={handleChange}
                />
              </div>
            </Form>
          </div>
          {rangeTemplate.map((item, idx) => (
            <p
              key={idx}
              className={Classes.join(['t_sub', styles.rangeTemplate])}
              onClick={() => changeFromTemplate(item.range)}
            >
              {item.title}
            </p>
          ))}
          <Button
            disabled={disabled}
            onClick={handleSubmit(onPress)}
            text="Применить"
            size="small"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductPrice;
