import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';
import MediaQuery from 'react-responsive/src/Component';

import { Breadcrumbs, Container, Line } from '../../components';
import store from '../../stores';
import productsStore from '../../stores/ProductsStore';
import CatalogMeta from '../Popups/CatalogMeta';
import { ProductsList } from '../utils';

import {
  Category,
  MobileBreadcrumbs,
  MobileCat,
  MobileFilter,
  Title,
} from './components';

import Filter from './components/Filter/Filter';
import styles from './Products.module.scss';

const Products = observer(
  ({
    category,
    childCategory = null,
    childItem = null,
    startPage = 1,
    query = null,
  }) => {
    const url = `${category ? category : ''}${
      childCategory !== null ? `/${childCategory}` : ''
    }${childItem !== null ? `/${childItem}` : ''}`;

    const { breadcrumbs, countOfPages, currentPage, countOfProducts, filter } =
      productsStore;
    useEffect(() => {
      productsStore._getItems(url, startPage);
    }, []);

    useEffect(() => {
      productsStore._getItems(url, startPage);
    }, [url, store.user.currentCity, filter]);

    const onPageChanged = page => {
      let meta = document.querySelectorAll('.meta_temp');
      Array.prototype.slice.call(meta).forEach(function (tag) {
        tag.remove();
      });

      window.history.pushState(null, null, 'catalog/' + url + (page > 1 ? `/${page}` : ''));
      currentPage !== page && productsStore._getItems(url, page);
    };
    const title = breadcrumbs.map(item => item.name).join(', ');

    return (
      <>  
        <Container>
          <MetaTags>
            <title>
              {`${
                productsStore.metaData.metaTitle ||
                `${title} купить в интернет-магазине Gardershop`
              } `}{' '}
              {currentPage > 1 ? ` - страница ${currentPage}` : ''}
            </title>
            <meta
              name="description"
              content={
                (productsStore.metaData.metaDescription ||
                  `${title} купить в интернет-магазине Gardershop`) +
                (currentPage > 1 ? ` - страница ${currentPage}` : '')
              }
            />

            <link rel="canonical" href={`/catalog/${url}`} />

            {currentPage > 1 && (
              <link
                className={'meta_temp'}
                rel="prev"
                href={`${url}/${currentPage - 1}`}
              />
            )}

            {currentPage < countOfPages && (
              <link
                className={'meta_temp'}
                rel="next"
                href={`${url}/${currentPage + 1}`}
              />
            )}
          </MetaTags>
          {store.user?.permissionLvl >= 2 && (
            <CatalogMeta
              id={url}
              metaTitle={productsStore.metaData.metaTitle}
              metaDescription={productsStore.metaData.metaDescription}
              description={productsStore.metaData.description}
              name={''}
            />
          )}
          <MediaQuery minWidth={960}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Title
              title={breadcrumbs[breadcrumbs.length - 1]?.name}
              countOfProducts={countOfProducts}
            />
          </MediaQuery>

          <MediaQuery maxWidth={960}>
            <MobileBreadcrumbs
              title={breadcrumbs[breadcrumbs.length - 1]?.name}
              countOfProducts={countOfProducts}
            />
          </MediaQuery>
        </Container>

        <MediaQuery maxWidth={960}>
          <Line />
        </MediaQuery>
        <Container>
          <div className="flex">
            <MediaQuery minWidth={960}>
              <Category url={{ category, childCategory, childItem }} />
            </MediaQuery>
            <div className={styles.productsFilter}>
              <MediaQuery maxWidth={960}>
                <div className="flex a-center j-between mt-15 mb-15">
                  <MobileCat />
                  <MobileFilter />
                </div>
              </MediaQuery>

              <MediaQuery minWidth={960}>
                <Filter />
              </MediaQuery>
              <ProductsList
                list={productsStore.products}
                currentPage={currentPage}
                countOfPages={countOfPages}
                countOfProducts={countOfProducts}
                onPageChanged={onPageChanged}
                description={productsStore.metaData.description}
              />
            </div>
          </div>
        </Container>
      </>
    );
  },
);

export default Products;
