import React, { useState } from 'react';

import { Classes } from '../../utils';

import styles from './Shipping.module.scss';

const Shipping = ({ delivery = {}, shop = {} }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={Classes.join([
        styles.ship,
        show && styles.active,
        'mb-2 mt-2',
      ])}
    >
      <span
        className="t_body flex j-between a-center mb-1"
        onClick={() => setShow(s => !s)}
      >
        Доставка
        <svg
          width="24"
          style={{ transform: `rotate(${show ? 0 : 180}deg)` }}
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 15L12 9L18 15"
            stroke="#131314"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {show && (
        <div className="t_sub">
          <p>
            Доставка то по г. {shop?.city || shop?.cityName} —
            <span className={styles.shipPrice}>
              {delivery?.cityDeliveryCost === 0
                ? 'Бесплатно'
                : delivery?.cityDeliveryCost}
            </span>
          </p>
          {delivery?.countryDelivery && (
            <p>
              Доставка по РК —{' '}
              <span className={styles.shipPrice}>
                {delivery?.countryDeliveryCost}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shipping;
