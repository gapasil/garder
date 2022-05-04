import React, { useEffect, useState } from 'react';

import { runInAction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useCookies } from 'react-cookie';
import MetaTags from 'react-meta-tags';

import { Breadcrumbs, Container } from '../../components';
import useGetParameter from '../../hooks/useGetParameter';
import API from '../../services/api';
import store from '../../stores';
import productStore from '../../stores/ProductStore';
import { CardSlider } from '../utils';

import ProductInfo from './components/ProductInfo/ProductInfo';
import Reviews from './components/Reviews/Reviews';
import ProductSlider from './components/Slider/Slider';

// class ProductStore {
//     constructor() {
//         makeObservable(this, {
//             product : observable,
//         })
//     }
//
//     product = {}
//
// }

const ProductPage = observer(({ itemId }) => {
  const [data, setData] = useState({});

  const [cookies, setCookie] = useCookies(['actionpay']);

  useEffect(() => {
    // await productStore.getProduct(itemId);
    // setData(productStore.product);
    getProduct(itemId);
  }, [itemId]);

  const getProduct = async itemId => {
    try {
      store.toggleLoading(true);
      const { data } = await API.get(`/catalog/${itemId}`);
      runInAction(() => {
        productStore._product = { ...data };
        setData(data);
      });
    } catch {
    } finally {
      store.toggleLoading(false);
    }
    // setData(data);
  };

  const getProductMeta = product => {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product?.name,
      image: product?.images || [],
      description: product?.description,
      sku: '',
      mpn: '',
      brand: {
        '@type': 'Brand',
        name: product?.shop.name,
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: product?.rating.average,
        },
        author: {
          '@type': 'Person',
          name: product?.shop.name,
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product?.rating.average,
        reviewCount: product?.rating.count,
      },
    };
  };

  const actionPay = useGetParameter('actionpay');

  useEffect(() => {
    if (actionPay) {
      const dateExpiry = new Date();
      dateExpiry.setDate(dateExpiry.getDate() + 30);
      setCookie('actionpay', actionPay, { path: '/', expires: dateExpiry });
    }
  }, [actionPay]);

  return (
    <Container>
      <MetaTags>
        <title>
          {' '}
          {data?.product?.name} купить в интернет-магазине Gardershop
        </title>
        <meta
          name="description"
          content={`${data?.product?.name} купить в интернет-магазине Gardershop`}
        />
        <script type="application/ld+json">
          {JSON.stringify(getProductMeta(data?.product))}
        </script>
      </MetaTags>
      <Breadcrumbs breadcrumbs={toJS(data?.breadcrumbs)} />
      <div className="flex wrap a-start j-between mt-4">
        {data?.product?.images && (
          <ProductSlider
            alt={data?.product?.name}
            images={toJS(data.product.images)}
          />
        )}
        <ProductInfo product={toJS(data?.product)} />
      </div>
      <Reviews
        average={toJS(data?.product?.rating?.average)}
        count={toJS(data?.product?.rating?.count)}
        itemId={itemId}
        isFeedbackButtonEnabled={toJS(data?.isFeedbackButtonEnabled)}
      />
      <CardSlider products={toJS(data?.sameProducts)} title="Похожие товары" />
    </Container>
  );
});

export default ProductPage;
