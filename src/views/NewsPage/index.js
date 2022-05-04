import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

import { Container, Line } from '../../components';
import API from '../../services/api';
import store from '../../stores';
import newsStore from '../../stores/NewsStore';
import { Classes } from '../../utils';
import { NewsContainer } from '../utils';

import insta from './assets/svg/instagram.svg';
import img from './img.png';
import styles from './NewsPage.module.scss';

const getMeta = item => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Новости',
        item: `https://${document.domain}/news`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: item?.title,
      },
    ],
  };
};

const NewsPage = observer(({ newsId }) => {
  const [news, setNews] = useState({});
  useEffect(() => {
    newsStore.getNews();
    getNews();
  }, [newsId]);
  const getNews = async () => {
    try {
      store.toggleLoading(true);
      const {
        data: { publication },
      } = await API.get(`/blog/${newsId}`);
      setNews(publication);
    } catch {
    } finally {
      store.toggleLoading(false);
    }
  };

  return (
    <Container className={styles.news}>
      <MetaTags>
        <title>{news?.title} | Gardershop – одежда и обувь</title>
        <script type="application/ld+json">
          {JSON.stringify(getMeta(news))}
        </script>
      </MetaTags>
      <div className="item mb-4">
        <h1 className="t_h2 mb-5">{news?.title}</h1>
        <img loading="lazy" src={news?.image} alt="image" />
        <div className={Classes.join(['flex mt-4', styles.content])}>
          <div className={styles.info}>
            <p className="t_sub mb- c_gray">{news?.created}</p>
            <div className="flex">
              <a to="#" className="mr-1">
                <img src={insta} alt="icon" />
              </a>
            </div>
          </div>
          <div className="description">
            <p className="t_body">{news?.content}</p>
          </div>
        </div>
      </div>

      <Line />
      <div
        className={Classes.join([
          'flex j-between t_sub c_gray mt-4 mb-10x',
          styles.date,
        ])}
      >
        <p>
          Добавлено <span>{news?.created}</span>
        </p>
        <div className="flex">
          <Link to="#" className="mr-1">
            <img src={insta} alt="icon" />
          </Link>
        </div>
      </div>
      <h2 className="t_h2 mb-5">Новости</h2>
      <NewsContainer news={newsStore.getOtherNews()} general={false} />
    </Container>
  );
});

export default NewsPage;
