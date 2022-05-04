import React, { useEffect, useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Circle } from 'react-color/lib/components/circle/Circle';
import { HashLink } from 'react-router-hash-link';
import Select from 'react-select';

import {
  Button,
  CartItem,
  Favourite,
  Modal,
  Price,
  Rating,
  Shipping,
} from '../../../../components';
import API from '../../../../services/api';
import store from '../../../../stores';
import cartStore from '../../../../stores/CartStore';
import productsStore from '../../../../stores/ProductsStore';
import { Classes } from '../../../../utils';

import cart from './assets/svg/shopping_cart.svg';
import styles from './ProductInfo.module.scss';

const defaultProduct = {};

const ProductInfo = observer(({ product = defaultProduct }) => {
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSizes, setSelectedSize] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colorway, setColorway] = useState({});
  const [colorArr, setColorArr] = useState([]);
  const [colorsObj, setColorsObj] = useState([]);
  const [colorsHex, setColorsHex] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setCartItemId(null);
    setColorsHex([]);
    setColorway({});
    setSizes([]);
    setSelectedColor({});
    setSelectedSize({});
    _init();
  }, [product]);

  const _init = () => {
    const sizes =
      product.selectableParameters &&
      product.selectableParameters.find(item => item.name === 'size');
    const colorway =
      product.selectableParameters &&
      product.selectableParameters.find(item => item.name === 'colorway');
    const sizesObj =
      sizes?.availableValues &&
      sizes.availableValues.map(item => ({
        value: item,
        label: item,
      }));
    setSizes(sizesObj);
    setColorway(colorway);
    const colorsArr = Object.values(toJS(productsStore.colors)).filter(
      item => colorway?.availableValues.indexOf(item.name) > -1,
    );

    const colorsObj =
      colorway?.availableValues &&
      colorway.availableValues.map(item => ({
        value: item,
        label: item,
      }));

    const colorsHex = colorsArr.map(item => item.hex);
    // productsStore._getColors();
    setColorArr(colorsArr);
    setColorsHex(colorsHex);
    setColorsObj(colorsObj);

    // changeColor(colorsHex[0]);
    colorsObj && changeColorObj(colorsObj[0]);
    sizesObj && changeSize(sizesObj[0]);
  };

  const changeColor = color => {
    setSelectedColor([color]);
  };
  const changeColorObj = color => {
    setSelectedColor(color);
  };
  const changeSize = size => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    try {
      await cartStore._getCart();
      const productInCart = cartStore.cart?.cart.find(
        item => item?.product?.id === product?.id,
      );
      setQuantity(productInCart?.quantity);

      let isSize = false;
      let isColor = false;
      // const params = productInCart?.parameters?.filter(item => {
      //         if (item.selectedValue === selectedSizes.value) {
      //             isSize = true;
      //             return true;
      //         } else if (toJS(productsStore.colors)[selectedColor[0]].name === item.selectedValue) {
      //             isColor = true;
      //             return true;
      //         }
      //         return false;
      //     }
      // );
      const params = productInCart?.parameters?.filter(item => {
        if (item.selectedValue === selectedSizes.value) {
          isSize = true;
          return true;
        } else if (item.selectedValue === selectedColor.value) {
          isColor = true;
          return true;
        }
        return false;
      });

      // if cart have a product, then checking from parameters
      if (productInCart && isSize && isColor) {
        const form = {
          cartItemId: productInCart.id,
          quantity: productInCart.quantity + 1,
        };
        const { data } = await API.post('cart/edit', toJS(form));
        await cartStore._getCart();
        setQuantity(productInCart.quantity + 1);
        // if product absent in cart, then product add to cart
      } else {
        const form = {
          productId: product.id,
          quantity: 1,
          parameters: [
            // {name: 'colorway', value: productsStore.colors[selectedColor].name},
            { name: 'colorway', value: selectedColor.value },
            { name: 'size', value: selectedSizes.value },
          ],
        };
        const { data } = await API.post('cart/add', toJS(form));
        store.setItemsInCart(data.itemsInCart);
        setCartItemId(data?.createdItem?.id);

        setQuantity(1);
        //    if have a duplicate params, then increment to quantity
      }
      // else {
      //     setCartItemId(productInCart.id);
      //     const form = {
      //         cartItemId: productInCart.id,
      //         quantity: productInCart.quantity + 1,
      //     }
      //     const {data} = await API.post('cart/edit', toJS(form));
      //
      //     setQuantity(productInCart.quantity + 1);
      //     await cartStore._getCart();
      // }
      togglePopup(true);
    } catch (e) {
      console.error(e);
    }
  };

  const togglePopup = (status = false) => {
    setOpenPopup(status);
  };

  return (
    <div className={styles.info}>
      <Rating item={product?.rating} />
      <h3 className="mt-15 mb-25">{product?.name}</h3>
      {colorsObj && (
        <Colors
          setSizeValue={changeColorObj}
          color={selectedColor}
          colors={colorsObj}
        />
      )}
      {sizes && (
        <Size setSizeValue={changeSize} size={selectedSizes} sizes={sizes} />
      )}
      <Price old={product?.price?.oldPrice} current={product?.price?.current} />
      <p className="t_sub c_gray">
        {product?.availability === 1 ? 'Есть в наличии' : 'Нет в наличии'}
      </p>
      <div
        className={Classes.join([
          'flex j-between a-center mt-15',
          styles.buttons,
        ])}
      >
        <Button
          onClick={addToCart}
          icon={cart}
          text="Добавить в корзину"
          size="middle"
        />
        <Modal
          width="100%"
          open={openPopup}
          header="Товар добавлен в корзину"
          onClose={togglePopup}
          lockScroll={false}
        >
          <div className={styles.list}>
            <CartItem
              cartItemId={cartItemId}
              product={product}
              setColor={changeColorObj}
              setSize={changeSize}
              size={selectedSizes}
              sizes={sizes}
              colors={colorsObj}
              color={selectedColor}
              quantity={quantity}
            />
          </div>
          <div className={styles.btnGroup}>
            <Button
              onClick={() => togglePopup(false)}
              theme="invers"
              text="Продолжить покупки"
            />
            <HashLink to="/cart#top">
              <Button text="Перейти в корзину" />
            </HashLink>
          </div>
        </Modal>
        <div className={Classes.join([styles.favBtn, 'ml-25'])}>
          <Favourite product={product} info={true} />
        </div>
      </div>
      <Shipping delivery={product?.delivery} shop={product?.shop} />
      <Description text={product?.description} params={product?.parameters} />
    </div>
  );
});
const ColorSelector = observer(
  ({ colors = [], selectedColor, setSelectedColor }) => {
    return (
      <div className={styles.selectors}>
        <span className="t_body flex mb-1">Цвет:</span>
        <Circle
          color={selectedColor}
          colors={colors}
          circleSize={15}
          circleSpacing={8}
          onChange={color => setSelectedColor(color.hex)}
          className="color_picker"
        />
      </div>
    );
  },
);

const Size = observer(({ size, sizes = [], setSizeValue }) => {
  const changeSizeHandler = (e, t) => {
    if (e.value !== size.value) {
      setSizeValue(e);
    }
  };
  return (
    <div className={styles.selectors}>
      <span className="t_body flex mb-1 mt-15">Размер:</span>
      <Select
        options={sizes}
        className={styles.select}
        placeholder="Выбрать размер"
        onChange={changeSizeHandler}
        defaultValue={size}
        value={size}
        styles={{
          placeholder: provider => ({
            ...provider,
            fontSize: '16px',
          }),
        }}
      />
    </div>
  );
});
const Colors = observer(({ color, colors = [], setSizeValue }) => {
  const changeSizeHandler = (e, t) => {
    if (e.value !== color.value) {
      setSizeValue(e);
    }
  };
  return (
    <div className={styles.selectors}>
      <span className="t_body flex mb-1 mt-15">Цвет:</span>
      <Select
        options={colors}
        className={styles.select}
        placeholder="Выбрать размер"
        onChange={changeSizeHandler}
        defaultValue={color}
        value={color}
        styles={{
          placeholder: provider => ({
            ...provider,
            fontSize: '16px',
          }),
        }}
      />
    </div>
  );
});

// const descriptList = {
//     category : { name : 'Категория:' },
//     season : { name : 'Сезон:' },
//     colorways : { name : 'Цвета:' },
//     materials : { name : 'Материалы:' },
//     country : { name : 'Производитель:' },
//     brand : { name : 'Бренд:' },
//     sizes : { name : 'Размеры::' },
// }

const Description = observer(({ text = '', params = [] }) => (
  <div className={styles.description}>
    <p className="t_sub mt-25 mb-15">Информация о товаре</p>
    <p className="t_sub mb-15" dangerouslySetInnerHTML={{ __html: text }} />
    <div className="list">
      {params.map((item, idx) => (
        <div key={idx} className={Classes.join(['flex mb-1', styles.item])}>
          <div>{item?.name}</div>
          <p>{item?.value}</p>
        </div>
      ))}
    </div>
  </div>
));

export default ProductInfo;
