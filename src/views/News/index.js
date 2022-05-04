import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';

import { Container } from '../../components';
import newsStore from '../../stores/NewsStore';
import Achievements from '../utils/Achievements/Achievements';

import NewsList from './components/NewsList/NewsList';
import TopNews from './components/TopNews/TopNews';

const getMeta = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Новости',
      },
    ],
  };
};

const News = observer(() => {
  useEffect(() => {
    newsStore.getNews();
  }, []);

  return (
    <Container>
      <MetaTags>
        <title>Новости | Gardershop – одежда и обувь</title>
        <script type="application/ld+json">{JSON.stringify(getMeta())}</script>
      </MetaTags>
      <TopNews news={newsStore?.topNews} />
      <NewsList news={newsStore?.blog} />
      <Achievements />
    </Container>
  );
});

export default News;
