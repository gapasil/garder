import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = process.env.BASE_URL;
const API = axios.create({ baseURL, withCredentials: true });

API.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 400) {
      console.error({
        title: error.response.data.message,
      });
    }
    if (error.response.data.message === 'auth/wrong-credentials') {
      toast('Проверьте правильность ввода пары логин/пароль', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    } else if (error.response.data.message === 'auth/email-already-exist') {
      toast('Email уже зарегистрирован в системе', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    } else if (error.response.data.message === 'user/email-is-not-verified') {
      toast('Ваш Email адрес не подтвержден', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    } else if (
      error.response.data.message ===
      'orders/items-are-not-available-for-delivery'
    ) {
      toast(
        'Один или несколько товаров не доступны для доставки в указанный город',
        {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.WARNING,
          autoClose: 5000,
        },
      );
    } else if (error.response.data.message === 'orders/invalid-item-ids') {
      toast(
        'Один или несколько элементов из корзины не существует или был удален',
        {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        },
      );
    } else if (
      error.response.data.message ===
      'orders/products-or-parameters-not-available'
    ) {
      toast(
        'Одного или нескольких товаров нет в наличии, либо выбранные параметры у товара(-ов) уже не доступны',
        {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        },
      );
    } else if (error.response.data.message === 'user/password-required') {
      toast('Чтобы изменить e-mail нужно ввести пароль', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    } else if (error.response.data.message === 'orders/cant-be-canceled') {
      toast(
        'Этот заказ нельзя отменить, либо заказ уже был принят магазином, либо он уже был отменен',
        {
          position: toast.POSITION.TOP_CENTER,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        },
      );
    } else if (error.response.data.message === 'orders/invalid-order-id') {
      toast('Заказ с таким id не существует, либо он был удален', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });
    } else if (
      error.response.data.message === 'subscription/already-subscribed'
    ) {
      toast('Этот E-mail уже подписан на рассылку!', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
        autoClose: 5000,
      });
    } else if (
      error.response.data.message === 'auth/invalid-confirmation-code'
    ) {
      toast('Неверный код подтверждения либо срок его действия истек', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
        autoClose: 5000,
      });
    } else if (error.response.data.message === 'user/invalid-password') {
      toast('Неверный пароль', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
        autoClose: 5000,
      });
    } else if (error.response.data.message === 'user/email-already-exist') {
      toast('Email уже зарегистрирован', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
        autoClose: 5000,
      });
    } else if (error.response.data.message === 'user/invalid-email') {
      toast('Некорректный email', {
        position: toast.POSITION.TOP_CENTER,
        type: toast.TYPE.INFO,
        autoClose: 5000,
      });
    }

    const err = error.toJSON();
    if (err.message === 'Network Error') {
    }

    return Promise.reject(error);
  },
);

export default API;
