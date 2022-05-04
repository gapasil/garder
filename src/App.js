import React, { useEffect, Suspense, lazy } from 'react';

import { configure } from 'mobx';
import { observer } from 'mobx-react';
import MetaTags from 'react-meta-tags';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './views/Profile/styles.css';
import { ToastContainer } from 'react-toastify';

import { Animation } from './components';
import LogoSpinner from './components/LogoSpinner';
import Spinner from './components/Spinner';
import API from './services/api';
import 'react-toastify/dist/ReactToastify.css';
import store from './stores';
import productsStore from './stores/ProductsStore';
import {
  // Cart,
  CreateOrder,
  // Home,
  // News,
  // ProductPage,
  // Products,
  Profile,
  NewsPage,
  Faq,
  Favourites,
  // Popups,
  AllNews,
  Policy,
} from './views';
import './assets/styles/style.css';

import Contacts from './views/Contacts';
import ProductRefund from './views/ProductRefund';
import Refund from './views/Refund';
import { Footer, Header, SubscribeForm } from './views/utils';

const Cart = lazy(() => import('./views/Cart'));
const Home = lazy(() => import('./views/Home'));
const Products = lazy(() => import('./views/Products'));
const ProductPage = lazy(() => import('./views/ProductPage'));
const News = lazy(() => import('./views/News'));
const Popups = lazy(() => import('./views/Popups'));
const OrderSuccess = lazy(() => import('./views/OrderSuccess'));

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: false,
  disableErrorBoundaries: true,
});

const App = observer(() => {
  useEffect(() => {
    _initApp();
  }, []);

  const _initApp = async () => {
    try {
      store.toggleLoading(true);
      await store._initUser();

      const {
        data: { categories },
      } = await API.get('categories');
      store.setCategories(categories);
      await store.setCities();
      await productsStore._getColors();
    } catch (error) {
    } finally {
      store.toggleLoading(false);
    }
  };

  const getMetaContacts = () => {
    return {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: 'https://gardershop.kz/',
      name: 'Интернет-магазин одежды Gardershop в Казахстане gardershop.kz',
      email: 'gardershop@gmail.com',
      logo: 'https://gardershop.kz/img/_/_/views/utils/components/Header/assets/svg/logo.svg',
      description:
        'Интернет-магазин одежды Gardershop в Казахстане ➣ Большой выбор ➣ Выгодные цены ➣ Быстрая доставка по Казахстану ➣ Профессиональная поддержка',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Казахстан, Нур-Султан',
        postalCode: '020000',
        streetAddress: 'ул. Динмухамеда Кунаева 12/1',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '23',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target:
          'https://gardershop.kz/index.php?route=product/search&search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+7-747-311-17-06',
          contactType: 'customer service',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+7-747-311-17-06',
          contactType: 'customer service',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+7-747-311-17-06',
          contactType: 'customer service',
        },
      ],
    };
  };

  return (
    <>
      <MetaTags>
        <script type="application/ld+json">
          {JSON.stringify(getMetaContacts())}
        </script>
      </MetaTags>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Header />
          <ToastContainer />
          <Animation show={store.loading}>
            <LogoSpinner />
          </Animation>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/success" component={OrderSuccess} />
            <Route
              path="/catalog/:category?/:childCategory?/:childItem?/:startPage?"
              render={({ match }) => {
                let getPage = x => {
                  x = parseInt(x);
                  return isNaN(x) ? 0 : x;
                };

                let page;
                if (!match.startPage) {
                  match.startPage = 1;
                  if (match.childItem) {
                    page = getPage(match.childItem);

                    if (page > 0) {
                      match.childItem = null;
                      match.startPage = page;
                    }
                  } else if (match.childCategory) {
                    page = getPage(match.childCategory);

                    if (page > 0) {
                      match.childCategory = null;
                      match.startPage = page;
                    }
                  }
                }

                return <Products {...match.params} />;
              }}
            />
            <Route
              path="/products/:id"
              exact
              render={({ match }) => {
                const { id } = match.params;
                return <ProductPage itemId={id} />;
              }}
            />
            <Route path="/cart" exact component={Cart} />
            <Route path="/createOrder" exact component={CreateOrder} />
            <Route path="/profile/" exact component={Profile} />
            <Route path="/news/" exact component={News} />
            <Route path="/allnews/" exact component={AllNews} />
            <Route
              path="/news/:id"
              exact
              render={({ match }) => {
                const { id } = match.params;
                return <NewsPage newsId={id} />;
              }}
            />
            <Route path="/faq/" exact component={Faq} />
            <Route path="/policy/" exact component={Policy} />
            <Route path="/products-refund/" exact component={ProductRefund} />
            <Route path="/contacts/" exact component={Contacts} />
            <Route path="/refund/" exact component={Refund} />
            <Route path="/favourites/" exact component={Favourites} />
            <Route path="/profile/orders" exact component={Profile} />
            <Route path="/profile/settings" exact component={Profile} />
            <Route path="/profile/useful" exact component={Profile} />
            <Redirect to="/" />
          </Switch>

          <SubscribeForm />
          <Footer />
          <Popups />
        </Suspense>
      </Router>
    </>
  );
});

export default App;
