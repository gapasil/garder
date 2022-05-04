import React, { useEffect, useState } from 'react';

import MetaTags from 'react-meta-tags';

import { Container } from '../../components';
import API from '../../services/api';
import { ProductsList } from '../utils';

const getMeta = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Избранное',
      },
    ],
  };
};

const Favourites = () => {
  const [products, setProducts] = useState([]);
  const [countOfPages, setPages] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [countOfProducts, setCountProducts] = useState(0);
  useEffect(() => {
    _initFavourites();
  }, []);

  const _initFavourites = async (page = 1) => {
    const {
      data: {
        favorites: { currentPage, countOfPages, products },
      },
    } = await API.get(`favorites?page=${page}`);
    setProducts(products);
    setPage(currentPage);
    setPages(countOfPages);
    setCountProducts(products === null ? 0 : products.length);
  };
  const onPageChanged = page => {
    currentPage !== page && _initFavourites(page);
  };

  return (
    <Container>
      <MetaTags>
        <title>Избранное | Gardershop – одежда и обувь</title>
        <script type="application/ld+json">{JSON.stringify(getMeta())}</script>
      </MetaTags>
      <h1>Избранное</h1>
      <ProductsList
        list={products}
        currentPage={currentPage}
        countOfPages={countOfPages}
        countOfProducts={countOfProducts}
        onPageChanged={onPageChanged}
      />
    </Container>
  );
};

export default Favourites;
