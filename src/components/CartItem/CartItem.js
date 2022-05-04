import React, { useEffect, useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import API from '../../services/api';
import store from '../../stores';
import cartStore from '../../stores/CartStore';
import productsStore from '../../stores/ProductsStore';
import { Classes, FormatPrice } from '../../utils';
import { Favourite, Input, Price } from '../index';

import del from './assets/svg/del.svg';
import styles from './CartItem.module.scss';
import img from './img.png';

const defaultProduct = {};
const defaultColor = [];
const defaultSize = {};

const CartItem = observer(
  ({
    cartItemId,
    cart = {},
    product = defaultProduct,
    color = defaultColor,
    size = defaultSize,
    quantity,
    setColor = () => {},
    setSize = () => {},
  }) => {
    const [countOfCart, setCountOfCart] = useState(quantity);
    const [count, setCount] = useState(quantity);
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState(
      product?.price?.current
        ? parseInt(product?.price?.current?.replace(' ', '')) * countOfCart
        : parseInt(product?.price?.price?.replace(' ', '')) * countOfCart,
    );
    const [oldPrice, setOldPrice] = useState(
      product?.price?.old
        ? parseInt(product?.price?.old?.replace(' ', '')) * countOfCart
        : parseInt(product?.price?.oldPrice?.replace(' ', '')) * countOfCart,
    );

    const [selectedColor, setSelectedColor] = useState(color);
    const [selectedSize, setSelectedSize] = useState(size);
    const [sizes, setSizes] = useState([]);
    const [colorway, setColorway] = useState({});
    const [colorsHex, setColorsHex] = useState([]);
    const [colorsObj, setColorsObj] = useState([]);

    useEffect(async () => {
      if (cartItemId) {
        const form = {
          cartItemId: cartItemId,
          quantity: countOfCart,
        };
        const { data } = await API.post('cart/edit', toJS(form));
        await cartStore._getCart();
        setPrice(
          parseInt(product?.price?.current.replace(' ', '')) * countOfCart,
        );
        oldPrice &&
          setOldPrice(
            parseInt(product?.price?.old.replace(' ', '')) * countOfCart,
          );
      }
    }, [countOfCart]);

    useEffect(() => {
      _init();
    }, [product, cartItemId]);

    const _init = () => {
      const sizes = product.selectableParameters
        ? product.selectableParameters.find(item => item.name === 'size')
        : cart.parameters && cart.parameters.find(item => item.name === 'size');
      const colorway = product.selectableParameters
        ? product.selectableParameters.find(item => item.name === 'colorway')
        : cart.parameters &&
          cart.parameters.find(item => item.name === 'colorway');
      const sizesObj =
        sizes?.availableValues &&
        sizes.availableValues.map(item => ({ value: item, label: item }));
      setSizes(sizesObj);
      setColorway(colorway);

      // const colorsArr = Object.values(toJS(productsStore.colors)).filter(item => colorway?.availableValues.indexOf(item.name) > -1);

      const colorsObj =
        colorway?.availableValues &&
        colorway.availableValues.map(item => ({
          value: item,
          label: item,
        }));
      // const colorsHex = colorsArr.map(item => item.hex);

      // setColorsHex(colorsHex);
      setColorsObj(colorsObj);
      if (colorway.selectedValue) {
        // changeColor(color);
        changeColorObj({
          value: colorway.selectedValue,
          label: colorway.selectedValue,
        });
      } else {
        // const selectColor = Object.values(toJS(productsStore.colors)).find(item => item.name === colorway.selectedValue);
        // selectColor && changeColor([selectColor.hex]);
        changeColorObj(color);
      }
      if (sizes.selectedValue) {
        changeSize({ value: sizes.selectedValue, label: sizes.selectedValue });
      } else {
        changeSize(size);
      }
    };

    const changeColor = color => {
      setColor(color[0]);
      setSelectedColor(color);
    };
    const changeColorObj = color => {
      setColor(color);
      setSelectedColor(color);
    };
    const changeSize = size => {
      setSize(size);
      setSelectedSize(size);
    };

    const changeColorHandlerObj = async (e, t) => {
      if (e.value !== selectedColor.value) {
        changeColorObj(e);
        const form = {
          cartItemId: cartItemId,
          parameters: [{ name: 'colorway', value: e.value }],
        };
        const { data } = await API.post('cart/edit', toJS(form));
        await cartStore._getCart();
      }
    };

    const changeSizeHandler = async (e, t) => {
      if (e.value !== selectedSize.value) {
        changeSize(e);
        const form = {
          cartItemId: cartItemId,
          parameters: [{ name: 'size', value: e.value }],
        };
        const { data } = await API.post('cart/edit', toJS(form));
        await cartStore._getCart();
      }
    };
    const changeColorHandler = async (e, t) => {
      if (e !== selectedColor[0]) {
        changeColor([e]);
        const form = {
          cartItemId: cartItemId,
          parameters: [
            { name: 'colorway', value: productsStore.colors[e].name },
          ],
        };
        const { data } = await API.post('cart/edit', toJS(form));
        await cartStore._getCart();
      }
    };
    const changeCount = (name, value) => {
      setCount(value);
    };

    const submitCount = () => {
      const val = FormatPrice(count.replace(/\D/, ''));
      if (val === '') {
        setCountOfCart(1);
        setCount(1);
      } else {
        setCountOfCart(val);
        setCount(val);
      }
    };

    const changeCountOne = async dec => {
      try {
        store.toggleLoading(true);
        if (dec) {
          setCountOfCart(s => (s > 1 ? s - 1 : s));
          setCount(s => (s > 1 ? s - 1 : s));
        } else {
          setCountOfCart(s => s + 1);
          setCount(s => s + 1);
        }
      } catch {
      } finally {
        store.toggleLoading(false);
      }
    };

    const changeShow = s => {
      setShow(s);
    };

    const removeCartItem = async () => {
      const { data } = await API.post('cart/remove', { cartItemId });
      store.setItemsInCart(data.itemsInCart);
      cartStore._getCart();
    };
    return (
      <div
        className={styles.cartItem}
        // onMouseEnter={ () => changeShow(true) }
        // onMouseLeave={ () => changeShow(false) }
      >
        <div className={styles.description}>
          <div className={styles.info}>
            <Link className="c_black" to={`/products/${product.id}`}>
              <img
                alt={product?.name}
                src={(product?.images && product?.images[0]) || product.img}
              />
            </Link>
            <div className="t_body">
              <Link className="c_black" to={`/products/${product.id}`}>
                <p className="">{product?.name}</p>
              </Link>
              <div className={styles.selects}>
                <div className={styles.select}>
                  Размер:
                  <Select
                    options={sizes}
                    isSearchable={false}
                    className={styles.select}
                    defaultValue={selectedSize}
                    value={selectedSize}
                    onChange={changeSizeHandler}
                    styles={{
                      placeholder: provider => ({
                        ...provider,
                        color: '#131314',
                        fontSize: '16px',
                      }),
                      indicatorSeparator: () => ({}),
                      valueContainer: provider => ({
                        ...provider,
                        paddingRight: '30px',
                      }),
                      // indicatorsContainer : (provider) => ({ ...provider, padding : '0px' }),
                      control: provider => ({
                        ...provider,
                        border: 'none',
                        background: 'transparent',
                        boxShadow: 'none',
                      }),
                    }}
                  />
                </div>
                <div className={styles.select}>
                  Цвет:
                  <Select
                    options={colorsObj}
                    isSearchable={false}
                    className={styles.select}
                    defaultValue={selectedColor}
                    value={selectedColor}
                    onChange={changeColorHandlerObj}
                    styles={{
                      placeholder: provider => ({
                        ...provider,
                        color: '#131314',
                        fontSize: '16px',
                      }),
                      indicatorSeparator: () => ({}),
                      valueContainer: provider => ({
                        ...provider,
                        paddingRight: '80px',
                      }),
                      // indicatorsContainer : (provider) => ({ ...provider, padding : '0px' }),
                      control: provider => ({
                        ...provider,
                        border: 'none',
                        background: 'transparent',
                        boxShadow: 'none',
                      }),
                    }}
                  />
                  {/*<Select*/}
                  {/*    isSearchable={ false }*/}
                  {/*    options={ colorsObj }*/}
                  {/*    className={ styles.select }*/}
                  {/*    defaultValue={ selectedColor }*/}
                  {/*    value={ selectedColor }*/}
                  {/*    onChange={ changeColorHandlerObj }*/}
                  {/*    components={ {*/}
                  {/*        Option: (props) => (*/}
                  {/*            <components.Option { ...props } >*/}
                  {/*                <Circle*/}
                  {/*                    colors={ [props.data] }*/}
                  {/*                    circleSize={ 16 }*/}
                  {/*                    circleSpacing={ 8 }*/}
                  {/*                />*/}
                  {/*            </components.Option>*/}
                  {/*        )*/}
                  {/*        ,*/}
                  {/*        MenuList: (props) => (*/}
                  {/*            <div className={ styles.menuOption }>*/}
                  {/*                { props.children }*/}
                  {/*            </div>*/}
                  {/*        ),*/}
                  {/*        SingleValue: (item) => {*/}
                  {/*            return (*/}
                  {/*                <div className={ styles.circleValue }>*/}
                  {/*                    <Circle*/}
                  {/*                        colors={ [item.data] }*/}
                  {/*                        circleSize={ 16 }*/}
                  {/*                        circleSpacing={ 8 }*/}
                  {/*                    />*/}
                  {/*                </div>*/}
                  {/*            )*/}
                  {/*        }*/}
                  {/*    }*/}
                  {/*    }*/}
                  {/*    styles={*/}
                  {/*        {*/}
                  {/*            placeholder: (provider) => ({*/}
                  {/*                ...provider,*/}
                  {/*                color: '#131314',*/}
                  {/*                fontSize: '16px',*/}
                  {/*            }),*/}
                  {/*            indicatorSeparator: () => ({}),*/}
                  {/*            control: (provider) => ({*/}
                  {/*                ...provider,*/}
                  {/*                border: 'none',*/}
                  {/*                background: 'transparent',*/}
                  {/*                boxShadow: 'none'*/}
                  {/*            }),*/}
                  {/*            option: (provider) => ({*/}
                  {/*                ...provider,*/}
                  {/*                background: 'transparent'*/}
                  {/*            })*/}
                  {/*        }*/}
                  {/*    }*/}
                  {/*/>*/}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.price}>
            <div className={styles.quantity}>
              <span className="t_body" onClick={() => changeCountOne(true)}>
                -
              </span>
              <Input
                value={count}
                type="text"
                onInput={changeCount}
                onBlur={submitCount}
              />
              <span className="t_body" onClick={() => changeCountOne(false)}>
                +
              </span>
            </div>
            <Price
              current={`${FormatPrice(price.toString())} ₸`}
              old={
                !isNaN(oldPrice) &&
                oldPrice &&
                `${FormatPrice(oldPrice.toString())} ₸`
              }
            />
          </div>
        </div>
        <div className={Classes.join([styles.btns, styles.active])}>
          <div
            onClick={removeCartItem}
            className={Classes.join([styles.delete, 't_body'])}
          >
            <img src={del} alt="icon" /> Удалить
          </div>
          <div className={Classes.join([styles.favourite, 't_body'])}>
            <Favourite product={product} cart={true} />
          </div>
        </div>
      </div>
    );
  },
);

export default CartItem;
