import React, { useEffect, useState } from 'react';

import { toJS } from 'mobx';
import { useLocation } from 'react-router-dom';

import { Animation } from '../../../../components';
import store from '../../../../stores';
import { MobileCategory } from '../../../utils';

import arrow_black from './assets/svg/arrow_black.svg';
import styles from './MobileCat.module.scss';

const MobileCat = () => {
  const [threeDropdown, setThreeDropdown] = useState(null);
  const [value, setValue] = useState(null);
  const [show, setShow] = useState(false);
  const onShow = () => {
    setShow(s => !s);
    setThreeDropdown(null);
  };

  const location = useLocation();

  useEffect(() => {
    setShow(false);
  }, [location]);

  return (
    <div className={styles.mobileContainer}>
      <p className="flex a-center mb-1" onClick={onShow}>
        {value ? value : 'Категория'}{' '}
        <img className="ml-1" src={arrow_black} alt="icon" />
      </p>
      <Animation show={show}>
        <div className={styles.mobileCat}>
          <MobileCategory
            list={toJS(store.categories)}
            setValue={setValue}
            general={false}
            threeDropdown={threeDropdown}
            setThreeDropdown={setThreeDropdown}
          />
        </div>
      </Animation>
    </div>
  );
};

export default MobileCat;
