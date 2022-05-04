import React from 'react';

import { useHistory } from 'react-router-dom';

import arrow_back from './assets/arrow_back.svg';

const MobileBreadcrumbs = ({ title, countOfProducts }) => {
  const history = useHistory();
  return (
    <div className="flex a-center mt-15 mb-15">
      <img
        onClick={() => {
          history.goBack();
        }}
        className="mr-15"
        src={arrow_back}
        alt="icon"
      />
      <div>
        <p className="t_sub">{title}</p>
        <span className="c_gray t_footnote">Товаров: {countOfProducts}</span>
      </div>
    </div>
  );
};

export default MobileBreadcrumbs;
