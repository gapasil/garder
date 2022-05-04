import React, { forwardRef, useState } from 'react';

import { Input } from '../index';

import eye from './assets/svg/eye.svg';
import eye_off from './assets/svg/eye_off.svg';

const PassInput = forwardRef(({ ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      ref={ref}
      onShow={() => setVisible(s => !s)}
      type={!visible ? 'password' : 'text̵'}
      {...props}
      icon={!visible ? eye : eye_off}
      theme="password"
    />
  );
});

export default PassInput;
