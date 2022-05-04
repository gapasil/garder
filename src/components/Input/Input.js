import React, { forwardRef, useCallback } from 'react';

import { Classes } from '../../utils';

import styles from './Input.module.scss';

const Input = forwardRef(
  (
    {
      onInput,
      name,
      invalid,
      value,
      type,
      onChange,
      placeholder,
      icon,
      errorMessage,
      border = 'small',
      theme = 'secondary',
      onShow = () => {},
      onSearch = () => {},
      onBlur = () => {},
      ...props
    },
    ref,
  ) => {
    const onChang = useCallback(
      text => {
        onInput && onInput(name, text.target.value);
      },
      [name],
    );
    // const invalide = useMemo(
    //     () =>
    //         invalid && value && value.length > 0
    //             ? styles.invalid
    //             : null,
    //     [invalid, value],
    // );
    return (
      <div
        className={Classes.join([
          styles.component,
          styles[theme],
          styles[border],
          'flex a-center',
          invalid ? styles.invalid : null,
        ])}
      >
        <input
          ref={ref}
          {...props}
          value={value}
          type={type}
          name={name}
          onInput={onChang}
          placeholder={placeholder}
          onChange={onChang}
          onBlur={onBlur}
        />
        {icon && (
          <img
            onClick={() => {
              onShow();
              onSearch();
            }}
            src={icon}
            alt="icon"
          />
        )}
        {/*{ invalid ?*/}
        {/*    <small> { errorMessage ? errorMessage : 'Данное поле является обязательным!' }</small> : null }*/}
      </div>
    );
  },
);

export default Input;
