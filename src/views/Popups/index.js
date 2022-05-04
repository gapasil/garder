import React from 'react';

import { GET_ENUMS } from '../../const/popup';
import useGetPopupState from '../../hooks/useGetPopupState';

import ChooseCity from './ChooseCity';
import EntryCode from './EntryCode';
import EntryEmail from './EntryEmail';
import ForgetPassword from './ForgetPassword';
import ProductColor from './ProductColor';
import ProductFilter from './ProductFilter';
import ProductPrice from './ProductPrice';
import ProductSeason from './ProductSeason';
import ProductSize from './ProductSize';
import ProductSort from './ProductSort';
import SignIn from './SignIn';
import SignUp from './SignUp';

const popups = {
  [GET_ENUMS.popup.signIn]: SignIn,
  [GET_ENUMS.popup.signUp]: SignUp,
  [GET_ENUMS.popup.forgetPassword]: ForgetPassword,
  [GET_ENUMS.popup.productSort]: ProductSort,
  [GET_ENUMS.popup.productFilter]: ProductFilter,
  [GET_ENUMS.popup.productSize]: ProductSize,
  [GET_ENUMS.popup.productSeason]: ProductSeason,
  [GET_ENUMS.popup.productColor]: ProductColor,
  [GET_ENUMS.popup.productPrice]: ProductPrice,
  [GET_ENUMS.popup.chooseCity]: ChooseCity,
  [GET_ENUMS.popup.entryCode]: EntryCode,
  [GET_ENUMS.popup.entryEmail]: EntryEmail,
};

const Popups = () => {
  const { mountedPopup, isOpened } = useGetPopupState();
  const Component = popups[mountedPopup];

  if (!Component) {
    return null;
  }

  return <Component isOpened={isOpened} />;
};

export default Popups;
