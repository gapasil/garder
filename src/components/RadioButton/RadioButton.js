import React, { forwardRef } from 'react';

import { Classes } from '../../utils';

import styles from './Radiobutton.module.scss';

const RadioButton = forwardRef(
  ({ name, label, onChange, onClick, active, ...props }, ref) => {
    return (
      <label className={styles.component} onClick={onClick}>
        <div className={styles.radioSwitch}>
          <input
            {...props}
            ref={ref}
            name={name}
            type="radio"
            onChange={onChange}
          />
          <span
            className={Classes.join([
              styles.radio,
              active ? styles.active : '',
            ])}
          ></span>
        </div>
        <div className={styles.label}>{label}</div>
      </label>
    );
  },
);

export default RadioButton;
