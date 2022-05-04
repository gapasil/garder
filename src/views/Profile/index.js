import React from 'react';

import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Container } from '../../components';
import { Classes } from '../../utils';

import OrderList from './OrderList/OrderList';
import Panel from './Panel/Panel';
import styles from './Profile.module.scss';
import Settings from './Settings/Settings';
import Useful from './Useful/Useful';

import './styles.css';

import MediaQuery from 'react-responsive/src/Component';

const Profile = () => {
  const location = useLocation();
  return (
    <Container
      className={Classes.join([
        styles.profile,
        location.pathname === '/profile/' ? styles.visible : '',
      ])}
    >
      <div className={Classes.join(['flex mt-4', styles.component])}>
        <Panel location={location.pathname === '/profile/'} />
        <TransitionGroup>
          <CSSTransition
            timeout={300}
            classNames="page"
            key={location.pathname}
          >
            <Switch location={location}>
              <Route path="/profile/orders" exact component={OrderList} />
              <Route path="/profile/settings" exact component={Settings} />
              <Route path="/profile/useful" exact component={Useful} />
              <MediaQuery minWidth={960}>
                <Redirect to="/profile/settings" />
              </MediaQuery>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Container>
  );
};

export default Profile;
