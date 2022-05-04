import React from 'react';

import { Classes } from '../../utils';
import Badge from '../Badge/Badge';

import styles from './GiveCard.module.scss';
import img from './img.png';

const GiveCard = ({ item }) => (
  <div className={styles.card}>
    <div className={styles.cardImage}>
      <Badge status={item.status} />
      <img className={styles.img} src={item.img} alt="image" />
    </div>
    <div className={styles.content}>
      <h4 className="mt-15 mb-15">{item.name}</h4>
      <div className={Classes.join([styles.info, 'flex j-between'])}>
        <div className={Classes.join([styles.item, 'flex column'])}>
          <span className="t_body">Приз</span>
          <span className={styles.value}>{item.priceAmount}</span>
        </div>
        <div className={Classes.join([styles.item, 'flex column'])}>
          <span className="t_body">Победители</span>
          <span className={styles.value}>1 </span>
        </div>
        <div className={Classes.join([styles.item, 'flex column'])}>
          <span className="t_body">Участников</span>
          <span className={styles.value}>{item.users}</span>
        </div>
      </div>
    </div>
  </div>
);

export default GiveCard;
