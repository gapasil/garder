import React from 'react';

import { HashLink } from 'react-router-hash-link';

import { Container } from '../../../components';
import { Classes } from '../../../utils';

import alfa from './assets/svg/alfa.svg';
import apple from './assets/svg/appstore.svg';
import google from './assets/svg/googleplay.svg';
import halyk from './assets/svg/halyk.svg';
import home from './assets/svg/home.svg';
import insta from './assets/svg/Instagram.svg';
import kaspi from './assets/svg/kaspi.svg';
import master from './assets/svg/mastercard.svg';
import visa from './assets/svg/visa.svg';
import whatsapp from './assets/svg/WhatsApp_black.svg';
import styles from './Footer.module.scss';

const Footer = () => (
  <Container>
    <div className={Classes.join([styles.footer, 'flex j-between wrap'])}>
      <div className={styles.column}>
        <p className="t_body">Для мобильных устройств</p>
        <a
          rel="noreferrer"
          href="https://is.gd/JHHvo0"
          className="flex mt-15"
          target="_blank"
        >
          <img src={apple} alt="Apple App" />
        </a>
        <a
          rel="noreferrer"
          href="https://is.gd/NZ2bl7"
          className="flex mt-15"
          target="_blank"
        >
          {' '}
          <img src={google} alt="Google App" />
        </a>
        <p className={Classes.join([styles.link, 'mt-15'])}>
          Вы также можете перейти на
          <a href="#">мобильную версию сайта.</a>
        </p>
      </div>
      <div className={styles.column}>
        <p className="t_body">Мы в соцсетях</p>
        <div className="flex a-center">
          <a
            rel="noreferrer"
            href="https://instagram.com/gardershopkz"
            className="flex mt-15 mb-15 mr-1"
            target="_blank"
          >
            <img src={insta} alt="Instagram" />
          </a>
          <a
            rel="noreferrer"
            href="http://wa.me/+77473111706"
            className="flex mt-15 mb-15"
            target="_blank"
          >
            <img src={whatsapp} alt="Instagram" />
          </a>
        </div>
        <p className={Classes.join([styles.text, 'mt-15'])}>
          Вы можете следить за нашими обновлениями в наших соцсетях
        </p>
      </div>
      <div className={styles.column}>
        <p className="t_body">Способы оплаты</p>
        <div className="flex a-center mt-15">
          <img className="mr-2" src={master} alt="Master Card" />
          <img src={visa} alt="Visa" />
        </div>
        <p className={Classes.join([styles.text, 'mt-15'])}>
          Вы можете оплатить покупки наличными при получении
        </p>
        <p className="t_body mt-1">Рассрочка</p>
        <div
          className={Classes.join([
            'flex wrap a-center mt-15',
            styles.implement,
          ])}
        >
          <img src={home} alt="Home" />
          <img src={halyk} alt="Halyk" />
          <img src={alfa} alt="Alfa" />
          <img src={kaspi} alt="Kaspi" />
        </div>
      </div>
      <div className={styles.column}>
        <p className="t_body">Покупателям</p>
        <div className="flex column mt-15">
          <HashLink
            to="/products-refund/#top"
            className={Classes.join([styles.text, 'mb-1'])}
          >
            Возврат товара
          </HashLink>
          <HashLink
            to="/refund/#top"
            className={Classes.join([styles.text, 'mb-1'])}
          >
            Возврат денежных средств
          </HashLink>
        </div>
        <p className="t_body">Компания</p>
        <div className="flex column mt-15">
          <HashLink
            to="/contacts/#top"
            className={Classes.join([styles.text, 'mb-1'])}
          >
            Контакты
          </HashLink>
        </div>
        <p className="t_body">Другое</p>
        <div className="flex column mt-15">
          <HashLink
            to="/policy/#top"
            className={Classes.join([styles.text, 'mb-1'])}
          >
            Политика конфиденциальности
          </HashLink>
        </div>
      </div>
    </div>
  </Container>
);

export default Footer;
