import React from 'react';

import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

import { Classes } from '../../utils';

import styles from './Breadcrumbs.module.scss';

const getMetaInfo = breadcrumbs => {
  let cats = breadcrumbs.map((crumb, key) => {
    let obj = {
      '@type': 'ListItem',
      position: key + 2,
      name: crumb.name,
    };

    if (key < breadcrumbs.length - 1) {
      obj['item'] = `https://${document.domain}/catalog/${crumb.url}`;
    }

    return obj;
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Каталог',
        item: `https://${document.domain}/catalog`,
      },
    ].concat(cats),
  };
};

const Breadcrumbs = observer(({ breadcrumbs = [] }) => (
  <div className={styles.breadcrumbs}>
    <MetaTags>
      <script type="application/ld+json">
        {JSON.stringify(getMetaInfo(breadcrumbs))}
      </script>
    </MetaTags>
    <Link className={Classes.join(['t_sub flex a-center', styles.link])} to="/">
      Главная
    </Link>
    {breadcrumbs.map((item, idx) => (
      <Link
        key={idx}
        className={Classes.join(['t_sub flex a-center', styles.link])}
        to={`/catalog/${item.url}`}
      >
        {item.name}
      </Link>
    ))}
  </div>
));

export default Breadcrumbs;
