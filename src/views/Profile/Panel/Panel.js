import React from 'react';

import { NavLink } from 'react-router-dom';

import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';

import arrow_right from './arrow_right.svg';
import styles from './Panel.module.scss';

const Panel = ({ location = false }) => {
  const exit = async () => {
    try {
      store.toggleLoading(true);
      await API.post('auth/signout');
      store.resetAuth();
      store._initUser();
    } catch {
    } finally {
      store.toggleLoading(false);
    }
  };
  return (
    <div
      className={Classes.join([
        styles.panel,
        'flex column',
        location ? styles.visible : '',
      ])}
    >
      <NavLink to="settings" activeClassName={styles.active} className="t_sub">
        Личные данные <img src={arrow_right} alt="icon" />
      </NavLink>
      <NavLink to="orders" activeClassName={styles.active} className="t_sub">
        Заказы
        <img src={arrow_right} alt="icon" />
      </NavLink>
      {/*<NavLink to='useful' activeClassName={ styles.active } className='t_sub'>Полезное*/}
      {/*    <img src={ arrow_right } alt="icon"/></NavLink>*/}
      {/*<NavLink to='#' className='t_sub'>Админ. панель*/}
      {/*    <img src={ arrow_right } alt="icon"/></NavLink>*/}
      {store.user.type === 'USER' && (
        <NavLink to="/" className="t_sub" onClick={exit}>
          Выход
        </NavLink>
      )}
    </div>
  );
};

export default Panel;
