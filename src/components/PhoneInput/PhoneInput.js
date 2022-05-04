import React, { forwardRef, useMemo } from 'react';

import InputMask from 'react-input-mask';

import { Classes } from '../../utils';

import styles from './PhoneInput.module.scss';

const PhoneInput = forwardRef(
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
      ...props
    },
    ref,
  ) => {
    // const onChang = useCallback(
    //     text => {
    //         onChange && onChange(name, text && text.target.value);
    //     },
    //     [name],
    // );
    const invalide = useMemo(
      () => (invalid && value && value.length > 0 ? styles.invalid : null),
      [invalid, value],
    );

    return (
      <div
        className={Classes.join([
          styles.component,
          invalid ? styles.invalid : null,
        ])}
      >
        <InputMask
          {...props}
          ref={ref}
          mask="+7 999 999 99 99"
          maskchar=" "
          name={name}
          value={value}
          onInput={onChange}
          onChange={onChange}
          placeholder={placeholder}
        />
        {/*{invalid ? <small>{errorMessage ? errorMessage : 'Данное поле является обязательным!' }</small> : null}*/}
      </div>
    );
  },
);

export default PhoneInput;
