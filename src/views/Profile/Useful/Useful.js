import React from 'react';

import { Classes } from '../../../utils';

import img from './img.png';
import styles from './Useful.module.scss';

const Useful = () => {
  return (
    <div className={styles.useful}>
      <p className="t_h3 mr-2 mb-25">Полезное</p>
      <div className={Classes.join(['flex wrap j-between', styles.list])}>
        <div className={styles.item}>
          <img className="mb-15" src={img} alt="icon" />
          <h4 className="t_h3 mb-15">Распродажи и акции</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            purus ligula, aliquam at nibh non Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Curabitur Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.{' '}
          </p>
        </div>
        <div className={styles.item}>
          <img className="mb-15" src={img} alt="icon" />
          <h4 className="t_h3 mb-15">Распродажи и акции</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            purus ligula, aliquam at nibh non Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Curabitur Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.{' '}
          </p>
        </div>
        <div className={styles.item}>
          <img className="mb-15" src={img} alt="icon" />
          <h4 className="t_h3 mb-15">Распродажи и акции</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            purus ligula, aliquam at nibh non Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Curabitur Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.{' '}
          </p>
        </div>
        <div className={styles.item}>
          <img className="mb-15" src={img} alt="icon" />
          <h4 className="t_h3 mb-15">Распродажи и акции</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            purus ligula, aliquam at nibh non Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Curabitur Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Useful;
