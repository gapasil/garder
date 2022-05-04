import React from 'react';

import { NewsContainer } from '../../../utils';

import styles from './NewsList.module.scss';

const NewsList = ({ news }) => {
  return (
    <div className={styles.list}>
      <h2 className="t_h1 mb-35 ">Все новости</h2>
      <div className="flex j-center">
        <NewsContainer all={true} general={false} news={news} />
      </div>
    </div>
  );
};

export default NewsList;
