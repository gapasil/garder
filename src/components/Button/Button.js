import React, { forwardRef, useRef } from 'react';

import { useRippleEffect } from '../../hooks';
import { Classes } from '../../utils';

import styles from './Button.module.scss';

const Button = forwardRef(
  (
    {
      type = 'button',
      size = 'small',
      theme = 'primary',
      text,
      disabled = false,
      onClick,
      icon = null,
      ...props
    },
    ref,
  ) => {
    const button = useRef(ref);
    useRippleEffect(button, styles.ripple);

    return (
      <div
        className={Classes.join([
          styles.component,
          styles[theme],
          styles[size],
        ])}
      >
        <button
          {...props}
          ref={button}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          {icon && <img src={icon} alt={text} />}
          {text}
        </button>
      </div>
    );
  },
);

export default Button;
