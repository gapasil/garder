import React from 'react';

import { observer } from 'mobx-react';

import { Classes } from '../../utils';

import star from './assets/svg/star.svg';
import styles from './Rating.module.scss';

const Rating = observer(({ item = {} }) => (
  <div className={Classes.join([styles.rating, 't_body'])}>
    {item.count === 0 ? (
      <span className={Classes.join([styles.testimonials, 't_body'])}>
        Нет отзывов{' '}
      </span>
    ) : (
      <>
        <span className="mr-15">
          {' '}
          <img src={star} alt="rating" /> {item.average}
        </span>

        <span className={Classes.join([styles.testimonials, 't_body'])}>
          Отзывов: {item.count}{' '}
        </span>
      </>
    )}
  </div>
));
export default Rating;
