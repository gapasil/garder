import React from 'react';
import './LogoSpinner.css';

import { ReactComponent as Logo } from '../../views/utils/Header/assets/svg/logo.svg';

const LogoSpinner = () => (
  <div className="spinner">
    <div className="logo-spinner-wrapper">
      <div className="logo-spinner" />
      <Logo />
    </div>
  </div>
);

export default LogoSpinner;
