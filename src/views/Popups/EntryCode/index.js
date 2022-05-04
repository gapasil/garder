import React, { useState } from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';

import { Button, Form, Input, Modal } from '../../../components';
import API from '../../../services/api';
import store from '../../../stores';
import { Classes } from '../../../utils';
import styles from '../Popups.module.scss';

const EntryCode = observer(() => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [redirect, setRedirect] = useState(false);
  const onSubmit = data => console.log(data);
  const history = useHistory();

  const submitCode = async form => {
    const { data } = await API.post('auth/new-password', {
      confirmationCode: form.code,
      ...toJS(store.resetForm),
    });
    setRedirect(data.status);
  };

  if (redirect) {
    return <Redirect to="?popup=sign-in" />;
  }
  return (
    <Modal
      header="Подтверждение кода"
      open={true}
      width="100%"
      maxWidth="440px"
      onClose={history.goBack}
    >
      <div className={styles.content}>
        <div className={Classes.join([styles.auth, styles.login])}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Введите код из письма"
              invalid={errors.email && true}
              {...register('code', {
                required: 'Это поле необходимо заполнить',
              })}
            />
            {errors.email && <p className="t_sub">{errors.email.message}</p>}
            <Button
              onClick={handleSubmit(submitCode)}
              size="middle"
              text="Сменить пароль"
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
});

export default EntryCode;
