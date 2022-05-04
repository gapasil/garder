import React, { useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect, useHistory } from 'react-router-dom';

import { Modal } from '../../../components';
import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const ChooseCity = observer(() => {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const onPress = async id => {
    try {
      store.toggleLoading(true);
      await API.post('user', toJS({ cityId: id }));
      setRedirect(true);
      await store._initUser();
    } catch (error) {
    } finally {
      store.toggleLoading(false);
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Modal
      header="Выберите город"
      open={true}
      width="100%"
      maxWidth="672px"
      onClose={history.goBack}
    >
      <div className={styles.content}>
        <div
          className={Classes.join([styles.auth, styles.login, styles.cities])}
        >
          {store.cities &&
            Object.values(store.cities).map(item => (
              <p
                key={item.id}
                onClick={() => onPress(item.id)}
                className={Classes.join([
                  store.user.currentCity === item.id ? styles.active : '',
                  't_sub',
                ])}
              >
                {' '}
                {item.name}
              </p>
            ))}
        </div>
      </div>
    </Modal>
  );
});

export default ChooseCity;
