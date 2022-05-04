import React from 'react';

import { observer } from 'mobx-react';
import { HashLink } from 'react-router-hash-link';

import { Button, Line } from '../../../components';
import newsStore from '../../../stores/NewsStore';
import { Classes } from '../../../utils';
import arrow from '../../News/components/NewsList/assets/svg/arrow.svg';

import styles from './NewsContainer.module.scss';

const NewsContainer = observer(({ news = [], general, all = false }) => {
  const loadNews = () => {
    newsStore.getNews(newsStore.currentPage + 1);
  };
  const renderItem = (item, idx) => {
    return (
      <div key={idx} className={Classes.join([styles.item, 'mt-15'])}>
        <div className="flex j-between">
          <span className="c_gray t_sub mr-25">{item?.created}</span>
          <HashLink
            to={`/news/${item.id}#top`}
            className="t_supbody bold mb-15"
          >
            {item?.title}
          </HashLink>
        </div>
        <Line />
      </div>
    );
  };
  return (
    <div>
      {news && news.map(renderItem)}
      {all && newsStore.currentPage < newsStore.countOfPages && (
        <div className="flex j-center mb-3 mt-3">
          <Button onClick={loadNews} text="Еще новости" />
        </div>
      )}
      {general && (
        <HashLink to="/allnews/#top" className="flex a-center bold t_sub mt-4">
          Больше новостей
          <img src={arrow} alt="icon" className="ml-1" />
        </HashLink>
      )}
    </div>
  );
});

export default NewsContainer;
