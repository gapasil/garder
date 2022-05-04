import React from 'react';

import { Classes } from '../../utils';

import styles from './Form.module.scss';

const Form = ({ children, theme, ...props }) => {
  return (
    <form
      {...props}
      // onSubmit={(e) => e.preventDefault()}
      className={Classes.join([styles.component, styles[theme]])}
    >
      {children}
    </form>
  );
};

export default Form;
