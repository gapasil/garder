import React from 'react';

import { Classes } from '../../utils';

const Container = ({ children, className, ...props }) => {
  return (
    <div className={Classes.join([className])} {...props}>
      <div className="container">{children}</div>
    </div>
  );
};

export default Container;
