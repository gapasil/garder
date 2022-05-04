import React, { forwardRef } from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = forwardRef(({ label, onInput, checked, ...props }, ref) => {
  return (
    <label className={styles.component}>
      <div className={styles.switch}>
        <input
          ref={ref}
          type="checkbox"
          onChange={onInput}
          checked={checked}
          {...props}
        />
        <span className={styles.check}></span>
      </div>
      <div className={styles.label}>{label}</div>
    </label>
  );
});

export default Checkbox;
