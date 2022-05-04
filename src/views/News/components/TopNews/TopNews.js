import React from 'react';

import { HashLink } from 'react-router-hash-link';

import { Classes } from '../../../../utils';

import styles from './TopNews.module.scss';

const TopNews = ({ news }) => {
  return (
    <HashLink to={`/news/${news.id}#top`}>
      <div
        className={Classes.join([
          styles.news,
          'mt-8 pl-4 flex j-between mb-10x',
        ])}
      >
        <div className={styles.heroText}>
          <span className="t_footnote c_gray">{news?.created}</span>
          <h1 className="t_h3 mt-25 mb-15">{news?.title}</h1>
          <p className="t_body">{news?.subtitle}</p>
        </div>
        <div className={styles.image}>
          {news.img && (
            <div style={{ background: `url(${news.img}) 0 0 no-repeat` }} />
          )}
          {/*<img src={img} alt="image"/>*/}
          {/*<div style={{background:'red'}}></div>*/}
        </div>
      </div>
    </HashLink>
  );
};

export default TopNews;
