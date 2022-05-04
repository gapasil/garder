import React, { useEffect } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';

import { Container } from '../../components';
import newsStore from '../../stores/NewsStore';
import Achievements from '../utils/Achievements/Achievements';

import NewsList from './components/NewsList/NewsList';

const AllNews = observer(() => {
  useEffect(() => {
    newsStore.getNews();
  }, []);

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

  return (
    <Container>
      <MetaTags>
        <title>Все новости | Gardershop – одежда и обувь</title>
        <script type="application/ld+json">{JSON.stringify(getMeta())}</script>
      </MetaTags>
      <NewsList news={toJS(newsStore?.allNews)} />
      <Achievements />
    </Container>
  );
});

export default AllNews;
