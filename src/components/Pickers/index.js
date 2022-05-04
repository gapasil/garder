import React, { useEffect, useState } from 'react';

import { runInAction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Circle } from 'react-color/lib/components/circle/Circle';
import { useForm } from 'react-hook-form';

import productsStore from '../../stores/ProductsStore';
import { Classes, FormatPrice } from '../../utils';
import { Button, Checkbox, Form, Input, SortItem } from '../index';

import styles from './Pickers.module.scss';

const sortList = [
  { id: 0, title: 'По популярности' },
  { id: 1, title: 'По росту цены' },
  { id: 2, title: 'По убыванию цены' },
  { id: 3, title: 'По новизне' },
  // {id: 4, title: 'По скидкам'},
];

export const Seasons = observer(() => {
  const [active, setActive] = useState(0);
  const [seasons, setSeasons] = useState(productsStore.filter.season);

  useEffect(() => {
    if (productsStore.filterClear === true) {
      setActive(0);
    }
  }, [productsStore.filterClear]);

  const handleCheck = id => {
    const itemIndex = seasons.findIndex(item => item.id === id);
    const item = seasons[itemIndex];

    const newItem = {
      ...item,
      isChecked: !item.isChecked,
    };

    setSeasons(s => {
      runInAction(() => {
        productsStore.filter.season = [
          ...s.slice(0, itemIndex),
          newItem,
          ...s.slice(itemIndex + 1),
        ];
      });
      return [...s.slice(0, itemIndex), newItem, ...s.slice(itemIndex + 1)];
    });
  };

  const handleClick = () => {
    setActive(seasons.filter(item => item.isChecked === true).length);
    const activeStr = seasons
      .filter(item => item.isChecked === true)
      .map(item => item.title)
      .join(',');
    productsStore.setFilter('season', seasons);
  };

  return (
    <SortItem title="Сезон" status={active && 'active'}>
      <div className={styles.seasons}>
        <div className={styles.list}>
          {seasons &&
            seasons.map(item => (
              <div key={item.id}>
                <Checkbox
                  onInput={() => handleCheck(item.id)}
                  label={item.title}
                  checked={item.isChecked}
                />
              </div>
            ))}
        </div>
        <div className={styles.line}></div>
        <Button onClick={handleClick} text="Применить" size="small" />
      </div>
    </SortItem>
  );
});

export const Sort = observer(() => {
  const [active, setActive] = useState(false);
  const [sort, setSort] = useState(0);
  const changeSort = id => {
    productsStore.setFilter('sort', id);
    setSort(id);
    setActive(true);
  };
  useEffect(() => {
    if (productsStore.filterClear === true) {
      setSort(0);
      setActive(false);
    }
  }, [productsStore.filterClear]);

  return (
    <SortItem title="Сортировка" status={active && 'active'}>
      <div className={styles.sortContent}>
        {sortList.map(item => (
          <div
            onClick={() => changeSort(item.id)}
            className={Classes.join([
              styles.sort,
              sort === item.id ? styles.active : '',
            ])}
            key={item.id}
          >
            {item.title}
          </div>
        ))}
      </div>
    </SortItem>
  );
});

export const Colors = observer(() => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    productsStore._getColors();
  }, []);

  useEffect(() => {
    runInAction(() => {
      setActive(
        Object.keys(productsStore.colors).filter(
          item => productsStore._colors[item].isChecked === true,
        ).length,
      );
    });
  }, [productsStore.colors]);

  useEffect(() => {
    if (productsStore.filterClear === true) {
      setActive(0);
      productsStore._getColors();
    }
  }, [productsStore.filterClear]);

  return (
    <SortItem title="Цвет" status={active && 'active'}>
      <div className={Classes.join([styles.colorPicker, 'column wrap'])}>
        {productsStore.colors &&
          Object.keys(productsStore.colors).map((item, idx) => {
            return (
              <div className="flex" key={idx}>
                <Checkbox
                  onInput={() => productsStore.setColor(item)}
                  label={
                    <Circle
                      colors={[item]}
                      circleSize={15}
                      onChange={() => {}}
                    />
                  }
                  checked={productsStore._colors[item].isChecked}
                />
              </div>
            );
          })}
      </div>
    </SortItem>
  );
});

export const Prices = observer(() => {
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
      setActive(false);
      setRange({ price_to: '', price_from: '' });
      productsStore.setFilter('price_from', null);
      productsStore.setFilter('price_to', null);
      reset({
        price_to: '',
        price_from: '',
      });
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
      if (form.price_to !== '' && form.price_from !== '') {
        setActive(true);
        runInAction(() => {
          productsStore.filter = {
            ...productsStore.filter,
            price_from: form.price_from.replace(/\D/, ''),
            price_to: form.price_to.replace(/\D/, ''),
          };
        });
        // productsStore.setFilter('price_from', form.price_from.replace(/\D/, ''));
        // productsStore.setFilter('price_to', form.price_to.replace(/\D/, ''));
      }
    } catch (error) {
    } finally {
      // store.toggleLoading(false);
    }
  };

  return (
    <SortItem
      title={`Цена${
        active
          ? `: ${
              productsStore.filter.price_from !== 'aN'
                ? productsStore.filter.price_from
                : ''
            } ${
              productsStore.filter.price_to
                ? `- ${productsStore.filter.price_to}`
                : ''
            }`
          : ''
      }`}
      status={active && 'active'}
    >
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
        <div className={styles.line}></div>
        <Button
          disabled={disabled}
          onClick={handleSubmit(onPress)}
          text="Применить"
          size="small"
        />
      </div>
    </SortItem>
  );
});

export const Size = observer(() => {
  const [active, setActive] = useState(0);
  const size = productsStore.filter.sizes;

  useEffect(() => {
    if (productsStore.filterClear === true) {
      setActive(0);
    }
  }, [productsStore.filterClear]);

  const handleCheck = id => {
    productsStore.changeCheckSize(id);
  };

  const handleClick = () => {
    setActive(size.filter(item => item.isChecked === true).length);
    productsStore.setFilter('size', size);
  };

  return (
    <SortItem title="Размеры" status={active && 'active'}>
      <div className={styles.seasons}>
        <div className={styles.list}>
          {size &&
            size.map(item => (
              <div key={item.id}>
                <Checkbox
                  onInput={() => handleCheck(item.id)}
                  label={item.title}
                  checked={item.isChecked}
                />
              </div>
            ))}
        </div>
        <div className={styles.line} />
        <Button onClick={handleClick} text="Применить" size="small" />
      </div>
    </SortItem>
  );
});

export const Brand = observer(() => {
  const [active, setActive] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const brand =
    (toJS(productsStore.searchedBrands.length) &&
      toJS(productsStore.searchedBrands)) ||
    toJS(productsStore.filter.brands);

  useEffect(() => {
    productsStore._getBrand();
  }, []);

  useEffect(() => {
    if (productsStore.filterClear === true) {
      setActive(0);
    }
  }, [productsStore.filterClear]);

  const handleCheck = id => {
    productsStore.changeCheckBrand(id);
  };

  const handleClick = () => {
    setActive(brand.filter(item => item.isChecked === true).length);
    productsStore.setFilter('brand', brand);
  };

  let delayFilter;
  const searchByLetter = letters => {
    delayFilter = setTimeout(() => {
      productsStore.filterByLetter(letters);
    }, 1000);
  };

  return (
    <SortItem title="Бренды" status={active && 'active'}>
      <input
        className={styles.searcherInput}
        onChange={e => {
          clearTimeout(delayFilter);
          setSearchWord(e.target.value);
          searchByLetter(e.target.value);
        }}
        value={searchWord}
        placeholder="поиск..."
      />
      <div className={styles.seasons}>
        <div className={styles.list}>
          {brand &&
            brand.map(
              (item, index) =>
                index < 11 && (
                  <div key={item.id}>
                    <Checkbox
                      onInput={() => handleCheck(item.id)}
                      label={item.title}
                      checked={item.isChecked}
                    />
                  </div>
                ),
            )}
        </div>
        <div className={styles.line} />
        <Button onClick={handleClick} text="Применить" size="small" />
      </div>
    </SortItem>
  );
});
