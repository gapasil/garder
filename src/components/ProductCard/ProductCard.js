import React, { useCallback, useState } from 'react';

import { runInAction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { HashLink } from 'react-router-hash-link';

import API from '../../services/api';
import store from '../../stores';
import cartStore from '../../stores/CartStore';
import productsStore from '../../stores/ProductsStore';
import { Classes } from '../../utils';
import { Button, CartItem, Favourite, Modal, Price, Rating, Pricemount } from '../index';

import styles from './ProductCard.module.scss';

const ProductCard = observer(({ item = {} }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [product, setProduct] = useState({});
  const [cartItemId, setCartItemId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSizes, setSelectedSize] = useState({});

  const togglePopup = (status = false) => {
    setOpenPopup(status);
  };

  const addToCart = useCallback(async () => {
    try {
      store.toggleLoading(true);
      const { data } = await API.get(`/catalog/${item.id}`);

      runInAction(() => {
        productsStore._getColors();
      });
      setProduct(data.product);
      const product = data.product;
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

      const colorsObj =
        colorway?.availableValues &&
        colorway.availableValues.map(item => ({
          value: item,
          label: item,
        }));

      setSelectedSize(sizesObj[0]);
      setSelectedColor(colorsObj[0]);

      await cartStore._getCart();
      const productInCart = cartStore.cart?.cart.find(
        item => item?.product?.id === product?.id,
      );
      setQuantity(productInCart?.quantity);

      let isSize = false;
      let isColor = false;

      // if cart have a product, then checking from parameters
      if (productInCart && isSize && isColor) {
        const form = {
          cartItemId: productInCart.id,
          quantity: productInCart.quantity + 1,
        };
        await API.post('cart/edit', toJS(form));
        await cartStore._getCart();
        setQuantity(productInCart.quantity + 1);
        // if product absent in cart, then product add to cart
      } else {
        const form = {
          productId: product.id,
          quantity: 1,
          parameters: [
            { name: 'colorway', value: colorsObj[0].value },
            { name: 'size', value: sizesObj[0].value },
          ],
        };
        const { data } = await API.post('cart/add', toJS(form));
        store.setItemsInCart(data.itemsInCart);
        setCartItemId(data?.createdItem?.id);

        setQuantity(1);
        //    if have a duplicate params, then increment to quantity
      }
      togglePopup(true);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImage}>
          <div className={styles.favorite}>
            <Favourite product={toJS(item)} />
          </div>
          <HashLink to={`/products/${item.id}`}>
            <img
              className={styles.img}
              loading="lazy"
              alt={item.name}
              src={item.img}
            />
          </HashLink>
        </div>
        <div className={styles.content}>
          <div className="flex a-center j-between">
            <HashLink to={`/products/${item.id}`}>
              <Price old={item.price?.oldPrice} current={item.price?.price} />
            </HashLink>
            <Modal
              width="100%"
              open={openPopup}
              header="Товар добавлен в корзину"
              onClose={togglePopup}
              lockScroll={false}
            >
              <div className={styles.list}>
                {product && (
                  <CartItem
                    color={selectedColor}
                    size={selectedSizes}
                    cartItemId={cartItemId}
                    product={product}
                    quantity={quantity}
                  />
                )}
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
          </div>
          <HashLink to={`/products/${item.id}#top`}>
            <p className={Classes.join([styles.name, 't_body mt-1'])}>
              {item.shopName}
            </p>
            <p className={Classes.join([styles.category, 't_body mt-1 mb-1'])}>
              {item.name}
            </p>
          </HashLink>
          <div className="flex a-center j-between">
            <Rating item={item.rating} />
          </div>
          <div className={Classes.join(['flex', styles.cardBtn])}>
            <Button onClick={addToCart} text="В корзину" size="middle" />
          </div>
        </div>
      </div>
    </>
  );
});

export default ProductCard;
