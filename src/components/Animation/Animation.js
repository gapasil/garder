import React from 'react';

import { CSSTransition } from 'react-transition-group';

import './style.css';

const Animation = ({ show, children }) => (
  <CSSTransition
    in={show}
    timeout={100}
    // classNames={ {...styles} }
    classNames="node"
    unmountOnExit
  >
    {children}
  </CSSTransition>
);

export default Animation;
